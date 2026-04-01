import { NextResponse } from 'next/server';
import { siteFeatures } from '@/lib/site-config';

const mockProjects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-featured e-commerce platform with product management, shopping cart, and payment integration',
    image: 'https://images.unsplash.com/photo-1661956600684-40bab6807d23?w=600&h=400&fit=crop',
    tags: ['Laravel', 'React', 'Stripe', 'PostgreSQL'],
    link: '#',
    github: '#',
    status: 'published',
    created_at: '2024-01-15',
    updated_at: '2024-03-20',
  },
  {
    id: 2,
    title: 'SaaS Analytics Dashboard',
    description: 'Real-time analytics dashboard with data visualization and user management system',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=600&h=400&fit=crop',
    tags: ['Laravel', 'Vue.js', 'Chart.js', 'MySQL'],
    link: '#',
    github: '#',
    status: 'published',
    created_at: '2024-02-10',
    updated_at: '2024-03-18',
  },
];

export async function GET() {
  if (!siteFeatures.mockApi) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    data: mockProjects,
  });
}

export async function POST(request: Request) {
  if (!siteFeatures.mockApi) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const body = await request.json();

  const newProject = {
    id: Math.max(...mockProjects.map((p) => p.id), 0) + 1,
    ...body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  mockProjects.push(newProject);

  return NextResponse.json(
    {
      success: true,
      data: newProject,
      message: 'Project created successfully',
    },
    { status: 201 }
  );
}
