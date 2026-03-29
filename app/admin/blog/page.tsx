'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';

export default function BlogAdmin() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Building Scalable Laravel Applications',
      category: 'Backend',
      date: '2024-03-15',
      status: 'Published',
      views: 234,
    },
    {
      id: 2,
      title: 'React Best Practices in 2024',
      category: 'Frontend',
      date: '2024-03-10',
      status: 'Published',
      views: 156,
    },
    {
      id: 3,
      title: 'Database Optimization Techniques',
      category: 'Database',
      date: '2024-03-05',
      status: 'Draft',
      views: 0,
    },
  ]);

  const deletePost = (id: number) => {
    setPosts(posts.filter((p) => p.id !== id));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Blog Posts</h1>
          <p className="text-slate-400">Manage your blog content</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold transition-all duration-300"
        >
          <Plus size={20} />
          New Post
        </Link>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-800/50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Views</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors duration-300">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-white">{post.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-sm">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-slate-400 text-sm">{formatDate(post.date)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 text-xs rounded-full font-medium ${
                        post.status === 'Published'
                          ? 'bg-green-500/10 text-green-400'
                          : 'bg-yellow-500/10 text-yellow-400'
                      }`}
                    >
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-slate-400 text-sm">
                      <Eye size={16} />
                      {post.views}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <Link href={`/admin/blog/${post.id}`} className="p-2 hover:bg-slate-700 rounded-lg text-cyan-400">
                        <Edit2 size={18} />
                      </Link>
                      <button onClick={() => deletePost(post.id)} className="p-2 hover:bg-slate-700 rounded-lg text-red-400">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
