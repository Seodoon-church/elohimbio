'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Paperclip, ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { getPosts, type Post } from '@/lib/board';
import { DocumentSnapshot } from 'firebase/firestore';

export default function BoardPage() {
  const t = useTranslations('board');
  const [posts, setPosts] = useState<Post[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [lastDocs, setLastDocs] = useState<Map<number, DocumentSnapshot>>(new Map());

  const pageSize = 10;
  const totalPages = Math.ceil(total / pageSize);

  const fetchPosts = useCallback(async (pageNum: number) => {
    setLoading(true);
    try {
      const lastDoc = pageNum > 1 ? lastDocs.get(pageNum - 1) : undefined;
      const result = await getPosts(pageNum, lastDoc ?? undefined);
      setPosts(result.posts);
      setTotal(result.total);
      if (result.lastDoc) {
        setLastDocs((prev) => new Map(prev).set(pageNum, result.lastDoc!));
      }
    } catch {
      // Firebase not configured yet — show empty state
      setPosts([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [lastDocs]);

  useEffect(() => {
    fetchPosts(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function formatDate(date: Date) {
    return date.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  return (
    <>
      {/* Header */}
      <section className="bg-forest text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold font-heading mb-2">
            {t('title')}
          </h1>
          <p className="text-white/70">{t('subtitle')}</p>
        </div>
      </section>

      {/* List */}
      <section className="py-10 md:py-14 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-slate">
              {t('table.title')} <span className="font-semibold text-charcoal">{total}</span>
            </p>
            <Link
              href="/board/write"
              className="bg-forest text-white font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-sage transition-colors"
            >
              {t('writeBtn')}
            </Link>
          </div>

          {loading ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center text-slate">
              <div className="animate-pulse">Loading...</div>
            </div>
          ) : posts.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-12 text-center">
              <FileText className="w-12 h-12 text-slate/30 mx-auto mb-4" />
              <p className="text-slate">{t('empty')}</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-mist border-b border-gray-200">
                      <th className="py-3 px-4 text-center text-slate font-medium w-16">{t('table.number')}</th>
                      <th className="py-3 px-4 text-left text-slate font-medium">{t('table.title')}</th>
                      <th className="py-3 px-4 text-center text-slate font-medium w-28">{t('table.author')}</th>
                      <th className="py-3 px-4 text-center text-slate font-medium w-28">{t('table.date')}</th>
                      <th className="py-3 px-4 text-center text-slate font-medium w-16">{t('table.views')}</th>
                      <th className="py-3 px-4 text-center text-slate font-medium w-12">{t('table.files')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post, idx) => (
                      <tr key={post.id} className="border-b border-gray-100 hover:bg-cream/50 transition-colors">
                        <td className="py-3 px-4 text-center text-slate">
                          {total - ((page - 1) * pageSize + idx)}
                        </td>
                        <td className="py-3 px-4">
                          <Link
                            href={`/board/${post.id}`}
                            className="text-charcoal font-medium hover:text-forest transition-colors"
                          >
                            {post.title}
                          </Link>
                        </td>
                        <td className="py-3 px-4 text-center text-slate">{post.author}</td>
                        <td className="py-3 px-4 text-center text-slate">{formatDate(post.createdAt)}</td>
                        <td className="py-3 px-4 text-center text-slate">{post.viewCount}</td>
                        <td className="py-3 px-4 text-center">
                          {post.files.length > 0 && (
                            <Paperclip className="w-4 h-4 text-slate/50 mx-auto" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden space-y-3">
                {posts.map((post, idx) => (
                  <Link
                    key={post.id}
                    href={`/board/${post.id}`}
                    className="block bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-charcoal font-medium flex-1 line-clamp-1">{post.title}</h3>
                      {post.files.length > 0 && (
                        <Paperclip className="w-4 h-4 text-slate/40 shrink-0 mt-0.5" />
                      )}
                    </div>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate">
                      <span>{post.author}</span>
                      <span>{formatDate(post.createdAt)}</span>
                      <span>{t('table.views')} {post.viewCount}</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-8">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-slate hover:text-charcoal disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {t('pagination.prev')}
                  </button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <button
                        key={p}
                        onClick={() => setPage(p)}
                        className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                          p === page
                            ? 'bg-forest text-white'
                            : 'text-slate hover:bg-mist'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="flex items-center gap-1 px-3 py-2 text-sm text-slate hover:text-charcoal disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    {t('pagination.next')}
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
