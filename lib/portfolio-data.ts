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

export const projectsData: Project[] = [
  {
    id: '1',
    title: 'Orfa AI',
    description: 'Built an AI chatbot platform for a USA client with custom AI agents, JWT-secured APIs, session tracking, user feedback flow, and usage analytics across a scalable Laravel backend.',
    image: '/projects/project-1.jpg',
    technologies: ['Laravel', 'OpenAI API', 'Redis', 'Docker', 'AWS', 'JWT'],
    featured: true,
  },
  {
    id: '2',
    title: 'Online University Management System',
    description: 'Developed a full university platform for West California University covering admissions, video classes, lecture locking, MCQ exams, attendance tracking, progress reporting, and Stripe tuition payments.',
    image: '/projects/project-2.jpg',
    technologies: ['Laravel', 'PostgreSQL', 'Vimeo API', 'Stripe', 'RBAC'],
    featured: true,
  },
  {
    id: '3',
    title: 'QuinsChat',
    description: 'Engineered a real-time communication platform with instant messaging, friend management, privacy controls, notifications, and audio/video calling support for concurrent user activity.',
    image: '/projects/project-3.jpg',
    technologies: ['Laravel', 'WebSockets', 'Realtime Events', 'Notifications'],
    featured: true,
  },
  {
    id: '4',
    title: 'Web-Based Quiz Application',
    description: 'Delivered a Bangla-supported, mobile-responsive quiz application on Upwork using PHP, MySQL, and jQuery with a clean admin-friendly workflow and strong client feedback.',
    image: '/projects/project-4.jpg',
    technologies: ['PHP', 'MySQL', 'jQuery', 'Bootstrap', 'Responsive UI'],
    featured: false,
  },
  {
    id: '5',
    title: 'AI and Education Platform Backends',
    description: 'Built backend architecture for AI chatbot products and education systems, including Redis optimization, secure payment flows, and stable APIs for production use.',
    image: '/projects/project-5.jpg',
    technologies: ['Laravel', 'Redis', 'Stripe', 'PayPal', 'AWS'],
    featured: false,
  },
  {
    id: '6',
    title: 'HRM and School Management Systems',
    description: 'Contributed to internal management platforms with permission handling, workflow features, and maintainable Laravel architecture during early-career product delivery work.',
    image: '/projects/project-6.jpg',
    technologies: ['Laravel', 'Spatie Permission', 'MySQL', 'Blade'],
    featured: false,
  },
];

export const skillsData: Skill[] = [
  { id: '1', name: 'Laravel', category: 'Backend', level: 'expert' },
  { id: '2', name: 'PHP', category: 'Backend', level: 'expert' },
  { id: '3', name: 'RESTful APIs', category: 'Backend', level: 'expert' },
  { id: '4', name: 'JWT Authentication', category: 'Backend', level: 'advanced' },
  { id: '5', name: 'RBAC & Permissions', category: 'Backend', level: 'advanced' },
  { id: '6', name: 'MySQL', category: 'Database', level: 'expert' },
  { id: '7', name: 'PostgreSQL', category: 'Database', level: 'advanced' },
  { id: '8', name: 'Redis', category: 'Database', level: 'advanced' },
  { id: '9', name: 'Query Optimization', category: 'Database', level: 'advanced' },
  { id: '10', name: 'React', category: 'Frontend', level: 'advanced' },
  { id: '11', name: 'Vue.js', category: 'Frontend', level: 'advanced' },
  { id: '12', name: 'Tailwind CSS', category: 'Frontend', level: 'advanced' },
  { id: '13', name: 'Docker', category: 'DevOps', level: 'advanced' },
  { id: '14', name: 'AWS', category: 'DevOps', level: 'advanced' },
  { id: '15', name: 'DigitalOcean', category: 'DevOps', level: 'advanced' },
  { id: '16', name: 'GitHub Actions', category: 'DevOps', level: 'advanced' },
  { id: '17', name: 'Jenkins', category: 'DevOps', level: 'intermediate' },
  { id: '18', name: 'Stripe', category: 'Integrations', level: 'advanced' },
  { id: '19', name: 'PayPal', category: 'Integrations', level: 'advanced' },
  { id: '20', name: 'OpenAI API', category: 'Integrations', level: 'advanced' },
];

export const experienceData: Experience[] = [
  {
    id: '1',
    position: 'Senior Laravel Developer',
    company: 'Quins Group / Quins International BD Ltd.',
    startDate: 'Aug 2025',
    endDate: undefined,
    current: true,
    description: 'Developing and optimizing Laravel backends for international clients, designing secure JWT-based APIs, and supporting business-critical systems with strong availability and performance requirements.',
    technologies: ['Laravel', 'JWT', 'RBAC', 'MySQL', 'PostgreSQL'],
  },
  {
    id: '2',
    position: 'Laravel Developer',
    company: 'SM Technology',
    startDate: 'Oct 2024',
    endDate: 'Aug 2025',
    current: false,
    description: 'Built backend architecture for AI chatbot platforms and university systems, improved response times by 30% through query tuning and Redis caching, and integrated Stripe and PayPal payment flows.',
    technologies: ['Laravel', 'Redis', 'Stripe', 'PayPal', 'Docker'],
  },
  {
    id: '3',
    position: 'Laravel Developer',
    company: 'BMS Global',
    startDate: 'Mar 2023',
    endDate: 'Oct 2024',
    current: false,
    description: 'Developed scalable REST APIs for mobile and web applications and automated bulk import/export workflows that improved operational efficiency by 40% for client-facing systems.',
    technologies: ['Laravel', 'REST APIs', 'MySQL', 'PostgreSQL', 'Automation'],
  },
  {
    id: '4',
    position: 'Junior Laravel Developer',
    company: 'OnestTech',
    startDate: 'Nov 2021',
    endDate: 'Mar 2023',
    current: false,
    description: 'Contributed to HRM and school management systems, implemented role and permission handling with Spatie Laravel Permission, and built a strong foundation in clean Laravel development.',
    technologies: ['Laravel', 'PHP', 'Spatie Permission', 'MySQL'],
  },
];

export const testimonialsData: Testimonial[] = [
  {
    id: '1',
    name: 'Upwork Client',
    role: 'Client',
    company: 'Upwork',
    content: 'My experience was excellent. The collaboration was smooth from start to finish. Communication was clear, deadlines were met, and the overall quality of work was impressive. Highly recommended for future projects.',
    avatar: '/placeholder-user.jpg',
  },
];

export const blogPostsData: BlogPost[] = [
  {
    id: '1',
    title: 'Designing JWT and RBAC APIs in Laravel for SaaS Products',
    slug: 'designing-jwt-rbac-apis-in-laravel',
    excerpt: 'A practical look at building secure Laravel APIs with JWT authentication, role-based access control, and maintainable backend structure.',
    content: 'Secure APIs are not just about authentication middleware. In production Laravel systems, the real challenge is designing permission boundaries, organizing services cleanly, and keeping the API easy to extend as the product grows. My preferred approach starts with clear auth responsibilities, then moves into role-aware policies, request validation, and modular business logic. This helps teams avoid the usual problems where access rules get scattered across controllers and become hard to trust. JWT can work very well in SaaS and mobile-first systems when it is paired with predictable token handling, refresh strategy, and thoughtful authorization design.',
    image: '/projects/project-1.jpg',
    publishedAt: '2026-02-12',
    readTime: 7,
    tags: ['Laravel', 'JWT', 'RBAC'],
  },
  {
    id: '2',
    title: 'Using Redis to Speed Up Laravel Applications Without Creating Operational Chaos',
    slug: 'using-redis-to-speed-up-laravel-applications',
    excerpt: 'Redis can improve response time fast, but only when caching, invalidation, and queue design are handled with discipline.',
    content: 'Redis is one of the fastest ways to improve perceived performance in Laravel applications, but it can also create hidden complexity when it is added carelessly. The systems I trust most use Redis with a clear purpose: response caching, queue support, session handling, or short-lived coordination between services. The improvement is real when queries are already understood, indexes are in place, and cache invalidation rules are simple enough for the team to maintain. In several production systems, that combination has been the difference between acceptable performance and a backend that feels genuinely fast under load.',
    image: '/projects/project-5.jpg',
    publishedAt: '2026-01-28',
    readTime: 6,
    tags: ['Laravel', 'Redis', 'Performance'],
  },
  {
    id: '3',
    title: 'Building Education Platforms in Laravel with Payments, Video, and Progress Tracking',
    slug: 'building-education-platforms-in-laravel',
    excerpt: 'Lessons from working on online education platforms where admissions, payment flows, video delivery, attendance, and progress all need to work together.',
    content: 'Education platforms become complex very quickly because the product is really several systems connected together. Admissions, lecture delivery, payment collection, exams, attendance, and reporting each have different operational needs, but users expect the whole platform to feel consistent. Laravel works well here when the product is broken into clear modules and each workflow is designed with the real administrator, instructor, and student experience in mind. In university systems, the hard part is rarely one isolated feature. It is making all of those features work together without turning maintenance into a constant firefight.',
    image: '/projects/project-2.jpg',
    publishedAt: '2025-12-18',
    readTime: 8,
    tags: ['Laravel', 'Education', 'Stripe'],
  },
];

export const portfolioOwner = {
  name: 'Abdullah Al Shahed',
  title: 'Senior Laravel Developer | Backend Architect',
  email: 'alshahed.cse@gmail.com',
  phone: '+8801907693009',
  location: 'Dhaka, Bangladesh',
  siteUrl: '',
  yearsExperience: 4,
  github: 'https://github.com/AlShahedKhan',
  linkedin: '',
  twitter: '',
};

export const aboutData = {
  title: 'About Me',
  intro: 'Senior Laravel developer with 4+ years of professional experience building secure, scalable systems for global clients.',
  description: 'I build robust Laravel applications across AI platforms, SaaS products, fintech workflows, real-time systems, and education platforms. My work spans backend architecture, API design, payment integration, deployment, and hands-on delivery from concept to production.',
  highlights: [
    '30+ production projects delivered',
    'Global client experience across the USA, UK, Japan, UAE, Australia, Canada, and Asia',
    'Strong in Laravel 8-12, Redis, Docker, AWS, Stripe, and PayPal',
    'Comfortable owning architecture, delivery, and team collaboration',
    'B.Sc. in Computer Science and Engineering from Stamford University Bangladesh',
  ],
};
