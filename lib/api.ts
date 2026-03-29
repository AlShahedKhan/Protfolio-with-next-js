// API Configuration and Utilities
// For Laravel backend connection

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  total: number;
  per_page: number;
  last_page: number;
}

// Project Types
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github: string;
  status: 'published' | 'draft';
  created_at: string;
  updated_at: string;
}

// Skill Types
export interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
  created_at: string;
}

// Experience Types
export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  duration: string;
  description: string;
  achievements: string[];
  created_at: string;
}

// Testimonial Types
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  created_at: string;
}

// Blog Types
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  views: number;
  status: 'published' | 'draft';
  tags: string[];
  created_at: string;
  updated_at: string;
}

// Settings Types
export interface PortfolioSettings {
  name: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  github: string;
  linkedin: string;
  twitter: string;
}

// Generic fetch function with error handling
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'An error occurred',
        errors: data.errors,
      };
    }

    return {
      success: true,
      data: data.data || data,
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      message: 'Failed to connect to the server',
    };
  }
}

// Projects API
export const projectsAPI = {
  getAll: async (): Promise<ApiResponse<Project[]>> => {
    return apiCall<Project[]>('/projects');
  },
  getOne: async (id: number): Promise<ApiResponse<Project>> => {
    return apiCall<Project>(`/projects/${id}`);
  },
  create: async (data: Partial<Project>): Promise<ApiResponse<Project>> => {
    return apiCall<Project>('/projects', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: async (id: number, data: Partial<Project>): Promise<ApiResponse<Project>> => {
    return apiCall<Project>(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: async (id: number): Promise<ApiResponse<null>> => {
    return apiCall<null>(`/projects/${id}`, {
      method: 'DELETE',
    });
  },
};

// Skills API
export const skillsAPI = {
  getAll: async (): Promise<ApiResponse<Skill[]>> => {
    return apiCall<Skill[]>('/skills');
  },
  create: async (data: Partial<Skill>): Promise<ApiResponse<Skill>> => {
    return apiCall<Skill>('/skills', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: async (id: number, data: Partial<Skill>): Promise<ApiResponse<Skill>> => {
    return apiCall<Skill>(`/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: async (id: number): Promise<ApiResponse<null>> => {
    return apiCall<null>(`/skills/${id}`, {
      method: 'DELETE',
    });
  },
};

// Experience API
export const experienceAPI = {
  getAll: async (): Promise<ApiResponse<Experience[]>> => {
    return apiCall<Experience[]>('/experience');
  },
  create: async (data: Partial<Experience>): Promise<ApiResponse<Experience>> => {
    return apiCall<Experience>('/experience', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: async (id: number, data: Partial<Experience>): Promise<ApiResponse<Experience>> => {
    return apiCall<Experience>(`/experience/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: async (id: number): Promise<ApiResponse<null>> => {
    return apiCall<null>(`/experience/${id}`, {
      method: 'DELETE',
    });
  },
};

// Testimonials API
export const testimonialsAPI = {
  getAll: async (): Promise<ApiResponse<Testimonial[]>> => {
    return apiCall<Testimonial[]>('/testimonials');
  },
  create: async (data: Partial<Testimonial>): Promise<ApiResponse<Testimonial>> => {
    return apiCall<Testimonial>('/testimonials', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: async (id: number, data: Partial<Testimonial>): Promise<ApiResponse<Testimonial>> => {
    return apiCall<Testimonial>(`/testimonials/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: async (id: number): Promise<ApiResponse<null>> => {
    return apiCall<null>(`/testimonials/${id}`, {
      method: 'DELETE',
    });
  },
};

// Blog API
export const blogAPI = {
  getAll: async (): Promise<ApiResponse<BlogPost[]>> => {
    return apiCall<BlogPost[]>('/blog');
  },
  getOne: async (slug: string): Promise<ApiResponse<BlogPost>> => {
    return apiCall<BlogPost>(`/blog/${slug}`);
  },
  create: async (data: Partial<BlogPost>): Promise<ApiResponse<BlogPost>> => {
    return apiCall<BlogPost>('/blog', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  update: async (id: number, data: Partial<BlogPost>): Promise<ApiResponse<BlogPost>> => {
    return apiCall<BlogPost>(`/blog/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
  delete: async (id: number): Promise<ApiResponse<null>> => {
    return apiCall<null>(`/blog/${id}`, {
      method: 'DELETE',
    });
  },
};

// Settings API
export const settingsAPI = {
  get: async (): Promise<ApiResponse<PortfolioSettings>> => {
    return apiCall<PortfolioSettings>('/settings');
  },
  update: async (data: Partial<PortfolioSettings>): Promise<ApiResponse<PortfolioSettings>> => {
    return apiCall<PortfolioSettings>('/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },
};

export default apiCall;
