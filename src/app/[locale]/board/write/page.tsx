'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';
import { Upload, X, FileIcon } from 'lucide-react';
import { createPost } from '@/lib/board';

const MAX_FILES = 3;
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export default function BoardWritePage() {
  const t = useTranslations('board.write');
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [password, setPassword] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(e.target.files ?? []);
    setError('');

    if (files.length + selected.length > MAX_FILES) {
      setError(t('errorFileCount'));
      return;
    }

    const oversized = selected.find((f) => f.size > MAX_FILE_SIZE);
    if (oversized) {
      setError(t('errorFileSize'));
      return;
    }

    setFiles((prev) => [...prev, ...selected]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function formatFileSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!title.trim() || !author.trim() || !password.trim() || !content.trim()) {
      setError(t('errorRequired'));
      return;
    }

    if (password.length < 4) {
      setError(t('errorRequired'));
      return;
    }

    setSubmitting(true);
    try {
      const id = await createPost(
        { title: title.trim(), content: content.trim(), author: author.trim(), password },
        files,
      );
      router.push(`/board/${id}`);
    } catch {
      setError(t('errorSubmit'));
      setSubmitting(false);
    }
  }

  return (
    <>
      <section className="bg-forest text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold font-heading">{t('title')}</h1>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-10 border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-charcoal mb-1">
                  {t('titleLabel')} <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t('titlePlaceholder')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-charcoal focus:ring-2 focus:ring-forest focus:border-transparent outline-none"
                />
              </div>

              {/* Author & Password */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-charcoal mb-1">
                    {t('authorLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="author"
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder={t('authorPlaceholder')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-charcoal focus:ring-2 focus:ring-forest focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-1">
                    {t('passwordLabel')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('passwordPlaceholder')}
                    minLength={4}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 text-charcoal focus:ring-2 focus:ring-forest focus:border-transparent outline-none"
                  />
                </div>
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-charcoal mb-1">
                  {t('contentLabel')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={10}
                  placeholder={t('contentPlaceholder')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-charcoal focus:ring-2 focus:ring-forest focus:border-transparent outline-none resize-none"
                />
              </div>

              {/* File Upload */}
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  {t('fileLabel')}
                </label>
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-forest/50 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-8 h-8 text-slate/40 mx-auto mb-2" />
                  <p className="text-sm text-slate">{t('fileBtn')}</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>

                {/* File List */}
                {files.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {files.map((file, idx) => (
                      <div
                        key={`${file.name}-${idx}`}
                        className="flex items-center gap-3 bg-mist rounded-lg px-4 py-2.5"
                      >
                        <FileIcon className="w-4 h-4 text-forest shrink-0" />
                        <span className="text-sm text-charcoal flex-1 truncate">{file.name}</span>
                        <span className="text-xs text-slate shrink-0">{formatFileSize(file.size)}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="text-slate hover:text-red-500 transition-colors shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <p className="text-xs text-slate">
                      {files.length}{t('fileSelected')}
                    </p>
                  </div>
                )}
              </div>

              {/* Error */}
              {error && (
                <div className="text-red-600 text-sm bg-red-50 rounded-lg p-3">{error}</div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-forest text-white font-semibold py-3 rounded-full hover:bg-sage transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? t('submitting') : t('submitBtn')}
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/board')}
                  className="px-6 py-3 text-slate font-medium hover:text-charcoal transition-colors"
                >
                  {t('cancelBtn')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
