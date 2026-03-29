import { NextResponse } from 'next/server';

const mockSkills = [
  { id: 1, name: 'Laravel', category: 'Backend', level: 95, created_at: '2024-01-15' },
  { id: 2, name: 'PHP', category: 'Backend', level: 95, created_at: '2024-01-15' },
  { id: 3, name: 'REST API', category: 'Backend', level: 90, created_at: '2024-01-15' },
  { id: 4, name: 'React', category: 'Frontend', level: 85, created_at: '2024-01-20' },
  { id: 5, name: 'Next.js', category: 'Frontend', level: 85, created_at: '2024-01-20' },
  { id: 6, name: 'Tailwind CSS', category: 'Frontend', level: 90, created_at: '2024-01-20' },
  { id: 7, name: 'PostgreSQL', category: 'Database', level: 90, created_at: '2024-01-25' },
  { id: 8, name: 'MySQL', category: 'Database', level: 88, created_at: '2024-01-25' },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockSkills,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const newSkill = {
    id: Math.max(...mockSkills.map((s) => s.id), 0) + 1,
    ...body,
    created_at: new Date().toISOString().split('T')[0],
  };

  mockSkills.push(newSkill);

  return NextResponse.json(
    {
      success: true,
      data: newSkill,
      message: 'Skill created successfully',
    },
    { status: 201 }
  );
}
