import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { Book, Clock, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingState from '../components/LoadingState';
import { getBlogPosts } from '../utils/blogUtils';
import type { BlogPost } from '../types/blog';

const Blog = () => {
  const navigate = useNavigate();
  const { data: posts, status } = useQuery<BlogPost[]>({
    queryKey: ['blog-posts'],
    queryFn: getBlogPosts
  });

  if (status === 'pending') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingState message="Loading blog posts..." />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Blog</h2>
          <p className="text-red-500">Failed to load blog posts. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Tests
            </button>
            <h1 className="text-xl font-serif">IELTS Insights</h1>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-16">
            {posts?.map((post) => (
              <article key={post.id} className="group">
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="aspect-[16/9] mb-8 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-serif group-hover:text-gray-600 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Book className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime} min read</span>
                      </div>
                      <time>
                        {format(new Date(post.publishedAt), 'MMMM d, yyyy')}
                      </time>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Blog;
