import { NextResponse } from 'next/server';
import { siteFeatures } from '@/lib/site-config';
// 
const mockBlogPosts = [
  {
    id: 1,
    title: 'Building Scalable Laravel Applications',
    slug: 'building-scalable-laravel',
    excerpt: 'Learn how to architect Laravel applications that can handle millions of users and maintain performance.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    category: 'Backend',
    date: '2024-03-15',
    views: 234,
    status: 'published',
    tags: ['Laravel', 'Performance', 'Architecture'],
    created_at: '2024-03-15',
    updated_at: '2024-03-15',
  },
  {
    id: 2,
    title: 'React Best Practices in 2024',
    slug: 'react-best-practices-2024',
    excerpt: 'Discover the latest React patterns and best practices for building modern, maintainable applications.',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=600&h=400&fit=crop',
    category: 'Frontend',
    date: '2024-03-10',
    views: 156,
    status: 'published',
    tags: ['React', 'Frontend', 'Best Practices'],
    created_at: '2024-03-10',
    updated_at: '2024-03-10',
  },
  {
    id: 3,
    title: 'Database Optimization Techniques',
    slug: 'database-optimization',
    excerpt: 'Master advanced database optimization techniques to improve query performance and reduce server load.',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&h=400&fit=crop',
    category: 'Database',
    date: '2024-03-05',
    views: 89,
    status: 'published',
    tags: ['Database', 'Performance', 'SQL'],
    created_at: '2024-03-05',
    updated_at: '2024-03-05',
  },
];

export async function GET() {
  if (!siteFeatures.mockApi) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: mockBlogPosts,
  });
}

export async function POST(request: Request) {
  if (!siteFeatures.mockApi) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const body = await request.json();

  const newPost = {
    id: Math.max(...mockBlogPosts.map((p) => p.id), 0) + 1,
    views: 0,
    ...body,
    created_at: new Date().toISOString().split('T')[0],
    updated_at: new Date().toISOString().split('T')[0],
  };

  mockBlogPosts.push(newPost);

  return NextResponse.json(
    {
      success: true,
      data: newPost,
      message: 'Blog post created successfully',
    },
    { status: 201 }
  );
}
