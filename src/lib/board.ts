import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
  getCountFromServer,
  increment,
  Timestamp,
  DocumentSnapshot,
} from 'firebase/firestore';
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { db, storage } from './firebase';

export interface PostFile {
  name: string;
  url: string;
  size: number;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  password: string;
  files: PostFile[];
  createdAt: Date;
  viewCount: number;
}

const POSTS_COLLECTION = 'posts';
const PAGE_SIZE = 10;

export async function getPosts(
  page: number = 1,
  lastDoc?: DocumentSnapshot,
): Promise<{ posts: Post[]; total: number; lastDoc: DocumentSnapshot | null }> {
  const postsRef = collection(db, POSTS_COLLECTION);

  // total count
  const countSnap = await getCountFromServer(postsRef);
  const total = countSnap.data().count;

  // query
  let q = query(postsRef, orderBy('createdAt', 'desc'), limit(PAGE_SIZE));
  if (page > 1 && lastDoc) {
    q = query(postsRef, orderBy('createdAt', 'desc'), startAfter(lastDoc), limit(PAGE_SIZE));
  }

  const snap = await getDocs(q);
  const posts: Post[] = snap.docs.map((d) => ({
    id: d.id,
    ...d.data(),
    createdAt: (d.data().createdAt as Timestamp).toDate(),
  })) as Post[];

  const newLastDoc = snap.docs[snap.docs.length - 1] ?? null;

  return { posts, total, lastDoc: newLastDoc };
}

export async function getPost(id: string): Promise<Post | null> {
  const docRef = doc(db, POSTS_COLLECTION, id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;

  // increment viewCount
  await updateDoc(docRef, { viewCount: increment(1) });

  const data = snap.data();
  return {
    id: snap.id,
    ...data,
    createdAt: (data.createdAt as Timestamp).toDate(),
    viewCount: (data.viewCount ?? 0) + 1,
  } as Post;
}

export async function createPost(
  data: { title: string; content: string; author: string; password: string },
  files: File[],
): Promise<string> {
  const uploadedFiles: PostFile[] = [];

  for (const file of files) {
    const storageRef = ref(storage, `board/${Date.now()}_${file.name}`);
    const snap = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snap.ref);
    uploadedFiles.push({ name: file.name, url, size: file.size });
  }

  const docRef = await addDoc(collection(db, POSTS_COLLECTION), {
    title: data.title,
    content: data.content,
    author: data.author,
    password: data.password,
    files: uploadedFiles,
    createdAt: Timestamp.now(),
    viewCount: 0,
  });

  return docRef.id;
}

export async function deletePost(id: string, password: string): Promise<boolean> {
  const docRef = doc(db, POSTS_COLLECTION, id);
  const snap = await getDoc(docRef);
  if (!snap.exists()) return false;

  const data = snap.data();
  if (data.password !== password) return false;

  // delete attached files from Storage
  for (const file of (data.files ?? []) as PostFile[]) {
    try {
      const fileRef = ref(storage, file.url);
      await deleteObject(fileRef);
    } catch {
      // file may already be deleted
    }
  }

  await deleteDoc(docRef);
  return true;
}
