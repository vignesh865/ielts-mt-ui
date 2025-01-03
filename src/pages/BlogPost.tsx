import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ArrowLeft, Book, Clock, Calendar } from 'lucide-react';
import LoadingState from '../components/LoadingState';
import MarkdownPreview from '@uiw/react-markdown-preview';
import { getBlogPost } from '../utils/blogUtils';
import type { BlogPost } from '../types/blog';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: post, status } = useQuery<BlogPost | null>({
    queryKey: ['blog-post', slug],
    queryFn: () => getBlogPost(slug!)
  });

  if (status === 'pending') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <LoadingState message="Loading blog post..." />
      </div>
    );
  }

  if (status === 'error' || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Post</h2>
          <p className="text-red-500 mb-4">Failed to load blog post. Please try again later.</p>
          <Link
            to="/blog"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Other Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <Link
              to="/blog"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </Link>
            <h1 className="text-xl font-serif">IELTS Insights</h1>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <article className="group">
            <div className="aspect-[16/9] mb-8 overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="space-y-4">
              <h1 className="text-3xl font-serif group-hover:text-gray-600 transition-colors">
                {post.title}
              </h1>

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

              <div className="prose max-w-none">
                <MarkdownPreview source={post.content} style={{ padding: 8 }} />
              </div>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;