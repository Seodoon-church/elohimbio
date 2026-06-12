'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Link, useRouter } from '@/i18n/navigation';
import { ArrowLeft, Download, Trash2, Eye, User, Calendar, Paperclip, AlertCircle } from 'lucide-react';
import { getPost, deletePost, type Post } from '@/lib/board';

export default function BoardDetailClient() {
  const t = useTranslations('board.detail');
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Delete modal state
  const [showDelete, setShowDelete] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [deleteError, setDeleteError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const data = await getPost(id);
        if (!data) {
          setNotFound(true);
        } else {
          setPost(data);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function handleDelete() {
    if (!deletePassword.trim()) return;
    setDeleteError('');
    setDeleting(true);

    try {
      const success = await deletePost(id, deletePassword);
      if (success) {
        router.push('/board');
      } else {
        setDeleteError(t('deleteErrorPassword'));
        setDeleting(false);
      }
    } catch {
      setDeleteError(t('deleteError'));
      setDeleting(false);
    }
  }

  function formatDate(date: Date) {
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function formatFileSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  if (loading) {
    return (
      <section className="py-20 bg-cream min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-slate">Loading...</div>
      </section>
    );
  }

  if (notFound) {
    return (
      <section className="py-20 bg-cream min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate mb-4">{t('notFound')}</p>
          <Link
            href="/board"
            className="text-forest font-medium hover:text-sage transition-colors"
          >
            {t('backToList')}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Header */}
      <section className="bg-forest text-white py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/board"
            className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('backToList')}
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold font-heading">{post!.title}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {post!.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(post!.createdAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              {post!.viewCount}
            </span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-10 md:py-14 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 border border-gray-100">
            {/* Body */}
            <div className="prose prose-charcoal max-w-none whitespace-pre-wrap text-charcoal leading-relaxed min-h-[200px]">
              {post!.content}
            </div>

            {/* Files */}
            {post!.files.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="flex items-center gap-2 text-sm font-semibold text-charcoal mb-3">
                  <Paperclip className="w-4 h-4" />
                  {t('files')} ({post!.files.length})
                </h3>
                <div className="space-y-2">
                  {post!.files.map((file) => (
                    <a
                      key={file.url}
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 bg-mist rounded-lg px-4 py-3 hover:bg-forest/5 transition-colors group"
                    >
                      <Download className="w-4 h-4 text-forest shrink-0" />
                      <span className="text-sm text-charcoal group-hover:text-forest flex-1 truncate">
                        {file.name}
                      </span>
                      <span className="text-xs text-slate shrink-0">
                        {formatFileSize(file.size)}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
              <Link
                href="/board"
                className="text-sm text-slate hover:text-charcoal transition-colors"
              >
                {t('backToList')}
              </Link>
              <button
                onClick={() => setShowDelete(true)}
                className="flex items-center gap-1.5 text-sm text-red-500 hover:text-red-700 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                {t('deleteBtn')}
              </button>
            </div>
          </div>

          {/* Delete Modal */}
          {showDelete && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
              <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm">
                <h3 className="text-lg font-bold text-charcoal mb-2">{t('deleteConfirm')}</h3>
                <label htmlFor="del-pw" className="block text-sm text-slate mb-2">
                  {t('deletePasswordLabel')}
                </label>
                <input
                  id="del-pw"
                  type="password"
                  value={deletePassword}
                  onChange={(e) => setDeletePassword(e.target.value)}
                  placeholder={t('deletePasswordPlaceholder')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-charcoal focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none mb-3"
                />
                {deleteError && (
                  <div className="flex items-center gap-2 text-red-600 text-sm mb-3">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {deleteError}
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleDelete}
                    disabled={deleting || !deletePassword.trim()}
                    className="flex-1 bg-red-500 text-white font-semibold py-2.5 rounded-full hover:bg-red-600 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
                  >
                    {deleting ? '...' : t('deleteSubmit')}
                  </button>
                  <button
                    onClick={() => {
                      setShowDelete(false);
                      setDeletePassword('');
                      setDeleteError('');
                    }}
                    className="px-4 py-2.5 text-sm text-slate hover:text-charcoal transition-colors"
                  >
                    {t('deleteCancel')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
