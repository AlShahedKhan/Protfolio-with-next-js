import {
  aboutData,
  blogPostsData,
  experienceData,
  portfolioOwner,
  projectsData,
  skillsData,
  testimonialsData,
} from '@/lib/portfolio-data';

// Temporary local content adapter. Keep these accessors stable so the
// implementation can later move to Laravel without a large component rewrite.
export const getPortfolioOwner = () => portfolioOwner;

export const getAboutData = () => aboutData;

export const getProjects = () => projectsData;

export const getFeaturedProjects = () =>
  projectsData.filter((project) => project.featured).slice(0, 3);

export const getSkills = () => skillsData;

export const getExperience = () => experienceData;

export const getTestimonials = () => testimonialsData;

export const getBlogPosts = () => blogPostsData;

export const getBlogPostBySlug = (slug: string) =>
  blogPostsData.find((post) => post.slug === slug);
