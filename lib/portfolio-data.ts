// Portfolio data structure - This will be replaced with API calls to your Laravel backend
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
  github?: string;
  featured: boolean;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Experience {
  id: string;
  position: string;
  company: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
}

// Mock data - Replace with API calls
export const projectsData: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-featured e-commerce platform with product management, shopping cart, and payment integration.',
    image: '/projects/project-1.jpg',
    technologies: ['Laravel', 'React', 'Stripe', 'PostgreSQL'],
    link: 'https://example.com',
    github: 'https://github.com',
    featured: true,
  },
  {
    id: '2',
    title: 'SaaS Analytics Dashboard',
    description: 'Real-time analytics dashboard with data visualization and user management system.',
    image: '/projects/project-2.jpg',
    technologies: ['Laravel', 'Vue.js', 'Chart.js', 'MySQL'],
    link: 'https://example.com',
    github: 'https://github.com',
    featured: true,
  },
  {
    id: '3',
    title: 'Content Management System',
    description: 'Flexible CMS with role-based access control, media management, and content scheduling.',
    image: '/projects/project-3.jpg',
    technologies: ['Laravel', 'Tailwind', 'AJAX', 'S3'],
    link: 'https://example.com',
    github: 'https://github.com',
    featured: true,
  },
  {
    id: '4',
    title: 'Project Management Tool',
    description: 'Collaborative project management application with real-time updates, team management, and task tracking capabilities.',
    image: 'https://images.unsplash.com/photo-1460925895917-adf4ee868e4e?w=600&h=400&fit=crop',
    technologies: ['Laravel', 'React', 'WebSocket', 'PostgreSQL', 'Docker'],
    link: 'https://example.com',
    github: 'https://github.com',
    featured: true,
  },
  {
    id: '5',
    title: 'Content Management System',
    description: 'Headless CMS built with Laravel API and modern frontend framework with SEO optimization and performance tuning.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    technologies: ['Laravel', 'Next.js', 'GraphQL', 'PostgreSQL', 'AWS'],
    link: 'https://example.com',
    github: 'https://github.com',
    featured: true,
  },
  {
    id: '6',
    title: 'Social Media Analytics',
    description: 'Analytics dashboard for tracking social media performance with data visualization and trend analysis.',
    image: 'https://images.unsplash.com/photo-1558482574-b72faab5e6ab?w=600&h=400&fit=crop',
    technologies: ['Laravel', 'Vue.js', 'Chart.js', 'APIs', 'MySQL'],
    featured: false,
  },
  {
    id: '7',
    title: 'Mobile App Backend',
    description: 'RESTful API backend for a mobile fitness application with user authentication and data synchronization.',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    technologies: ['Laravel', 'JWT', 'PostgreSQL', 'Redis', 'Queue Jobs'],
    featured: false,
  },
  {
    id: '8',
    title: 'Business Automation System',
    description: 'Workflow automation tool that streamlines business processes with scheduling and integration capabilities.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
    technologies: ['Laravel', 'Automation', 'APIs', 'MySQL', 'Cron Jobs'],
    featured: false,
  },
];

export const skillsData: Skill[] = [
  { id: '1', name: 'Laravel', category: 'Backend', level: 'expert' },
  { id: '2', name: 'PHP', category: 'Backend', level: 'expert' },
  { id: '3', name: 'PostgreSQL', category: 'Database', level: 'advanced' },
  { id: '4', name: 'MySQL', category: 'Database', level: 'advanced' },
  { id: '5', name: 'React', category: 'Frontend', level: 'advanced' },
  { id: '6', name: 'Vue.js', category: 'Frontend', level: 'advanced' },
  { id: '7', name: 'RESTful APIs', category: 'Backend', level: 'expert' },
  { id: '8', name: 'Docker', category: 'DevOps', level: 'intermediate' },
  { id: '9', name: 'Git', category: 'Tools', level: 'expert' },
  { id: '10', name: 'Redis', category: 'Database', level: 'intermediate' },
  { id: '11', name: 'AWS', category: 'DevOps', level: 'intermediate' },
  { id: '12', name: 'JavaScript', category: 'Frontend', level: 'advanced' },
  { id: '13', name: 'Tailwind CSS', category: 'Frontend', level: 'advanced' },
  { id: '14', name: 'GraphQL', category: 'Backend', level: 'intermediate' },
  { id: '15', name: 'Testing', category: 'Backend', level: 'advanced' },
  { id: '16', name: 'System Design', category: 'Architecture', level: 'intermediate' },
];

export const experienceData: Experience[] = [
  {
    id: '1',
    position: 'Senior Laravel Developer',
    company: 'Tech Solutions Inc.',
    startDate: 'Jan 2023',
    endDate: undefined,
    current: true,
    description: 'Leading backend development for enterprise applications, mentoring junior developers, and architecting scalable solutions.',
    technologies: ['Laravel', 'PostgreSQL', 'Docker', 'Redis', 'AWS'],
  },
  {
    id: '2',
    position: 'Full Stack Laravel Developer',
    company: 'Digital Innovation Labs',
    startDate: 'Jun 2022',
    endDate: 'Dec 2022',
    current: false,
    description: 'Developed full-stack web applications using Laravel and Vue.js, implementing RESTful APIs and frontend features.',
    technologies: ['Laravel', 'Vue.js', 'MySQL', 'JavaScript'],
  },
  {
    id: '3',
    position: 'Junior Laravel Developer',
    company: 'WebDev Startup',
    startDate: 'Mar 2022',
    endDate: 'May 2022',
    current: false,
    description: 'Started career building Laravel applications, learning best practices, and contributing to team projects.',
    technologies: ['Laravel', 'PHP', 'MySQL', 'Bootstrap'],
  },
];

export const testimonialsData: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Project Manager',
    company: 'Tech Solutions',
    content: 'Working with this developer was an absolute pleasure. The code quality, communication, and attention to detail exceeded our expectations.',
    avatar: '/avatars/avatar-1.jpg',
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'CTO',
    company: 'Digital Ventures',
    content: 'Exceptional problem-solving skills and ability to meet tight deadlines. The scalable architecture they built has served us well as we grew.',
    avatar: '/avatars/avatar-2.jpg',
  },
  {
    id: '3',
    name: 'Emma Rodriguez',
    role: 'Founder',
    company: 'StartUp Hub',
    content: 'This developer brings both technical expertise and business understanding. They made our project significantly better through thoughtful recommendations.',
    avatar: '/avatars/avatar-3.jpg',
  },
  {
    id: '4',
    name: 'David Park',
    role: 'Engineering Lead',
    company: 'Cloud Systems',
    content: 'Outstanding Laravel knowledge and modern development practices. A great team player who elevates everyone around them.',
    avatar: '/avatars/avatar-4.jpg',
  },
];

export const blogPostsData: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable Laravel Applications: Best Practices',
    slug: 'building-scalable-laravel-applications',
    excerpt: 'Learn the best practices for building scalable Laravel applications with clean architecture and optimization techniques.',
    content: 'Full blog post content here...',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    publishedAt: '2024-03-01',
    readTime: 8,
    tags: ['Laravel', 'Best Practices', 'Architecture'],
  },
  {
    id: '2',
    title: 'Advanced Laravel Query Optimization Techniques',
    slug: 'advanced-laravel-query-optimization',
    excerpt: 'Discover advanced techniques to optimize your Laravel database queries and improve application performance.',
    content: 'Full blog post content here...',
    image: 'https://images.unsplash.com/photo-1558482574-b72faab5e6ab?w=600&h=400&fit=crop',
    publishedAt: '2024-02-15',
    readTime: 10,
    tags: ['Laravel', 'Database', 'Performance'],
  },
  {
    id: '3',
    title: 'RESTful API Design: From Theory to Implementation',
    slug: 'restful-api-design-implementation',
    excerpt: 'A comprehensive guide to designing and implementing RESTful APIs using Laravel with real-world examples.',
    content: 'Full blog post content here...',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    publishedAt: '2024-02-01',
    readTime: 12,
    tags: ['API Design', 'Laravel', 'REST'],
  },
];

export const portfolioOwner = {
  name: 'Laravel Developer',
  title: 'Full Stack Laravel Developer',
  email: 'your.email@example.com',
  phone: '+1 (555) 123-4567',
  location: 'San Francisco, CA',
  siteUrl: 'https://yourportfolio.com',
  yearsExperience: 2,
  github: 'https://github.com/yourname',
  linkedin: 'https://linkedin.com/in/yourname',
  twitter: 'https://twitter.com/yourname',
};

export const aboutData = {
  title: 'About Me',
  intro: 'I\'m a passionate Laravel developer with 2 years of professional experience building robust, scalable web applications.',
  description: 'With a strong foundation in PHP and Laravel, I specialize in building efficient backend systems and RESTful APIs. I love writing clean, maintainable code and following SOLID principles. Beyond coding, I enjoy solving complex problems and staying updated with the latest web development trends.',
  highlights: [
    'Full-stack web development expertise',
    'Clean code and best practices advocate',
    'Passionate about learning and growth',
    'Strong communication skills',
    'Experience with various industries',
    'Performance optimization focused',
  ],
};
