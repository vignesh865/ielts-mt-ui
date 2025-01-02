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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <LoadingState message="Loading blog post..." />
      </div>
    );
  }

  if (status === 'error' || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Error Loading Post</h2>
          <p className="text-red-500 mb-4">Failed to load blog post. Please try again later.</p>
          <Link
            to="/blog"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Link
            to="/blog"
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Blog
          </Link>

          <article className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative h-96">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8 pb-8 border-b">
                <div className="flex items-center gap-2">
                  <Book className="w-5 h-5" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <time>{format(new Date(post.publishedAt), 'MMMM d, yyyy')}</time>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{post.readTime} min read</span>
                </div>
              </div>

              <div className="prose max-w-none">
                <MarkdownPreview source={post.content} style={{ padding: 8 }} />
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;