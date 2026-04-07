import 'server-only';

import { z } from 'zod';
import { getLaravelApiBaseUrl, getLaravelApiUrl } from '@/lib/laravel-api';

export const PUBLIC_PROJECTS_PER_PAGE = 6;
export const PUBLIC_PROJECTS_PATH = '/projects';

const publicProjectSchema = z.object({
  id: z.number().int().nonnegative(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  image_url: z.string().nullable(),
  technologies: z.array(z.string()),
  live_url: z.string().nullable(),
  github_url: z.string().nullable(),
  featured: z.boolean(),
  sort_order: z.number().int().nullable().optional(),
  role: z.string().nullable().optional(),
  client_region: z.string().nullable().optional(),
  problem: z.string().nullable().optional(),
  solution: z.string().nullable().optional(),
  outcome: z.string().nullable().optional(),
  confidential: z.boolean(),
});

const publicProjectsResponseSchema = z.object({
  data: z.array(publicProjectSchema),
  links: z
    .object({
      first: z.string().nullable().optional(),
      last: z.string().nullable().optional(),
      prev: z.string().nullable().optional(),
      next: z.string().nullable().optional(),
    })
    .optional(),
  meta: z
    .object({
      current_page: z.number().int().nonnegative().optional(),
      from: z.number().int().nonnegative().nullable().optional(),
      last_page: z.number().int().nonnegative().optional(),
      links: z
        .array(
          z.object({
            url: z.string().nullable(),
            label: z.string(),
            page: z.number().int().nonnegative().nullable(),
            active: z.boolean(),
          })
        )
        .optional(),
      path: z.string().optional(),
      per_page: z.number().int().nonnegative().optional(),
      to: z.number().int().nonnegative().nullable().optional(),
      total: z.number().int().nonnegative().optional(),
    })
    .optional(),
});

const publicProjectsPaginationSchema = z.object({
  current_page: z.number().int().nonnegative().optional(),
  from: z.number().int().nonnegative().nullable().optional(),
  last_page: z.number().int().nonnegative().optional(),
  links: z
    .array(
      z.object({
        label: z.string(),
        page: z.number().int().nonnegative().nullable(),
        href: z.string().nullable(),
        active: z.boolean(),
      })
    )
    .optional(),
  path: z.string().optional(),
  per_page: z.number().int().nonnegative().optional(),
  to: z.number().int().nonnegative().nullable().optional(),
  total: z.number().int().nonnegative().optional(),
});

const publicProjectItemResponseSchema = z.object({
  data: publicProjectSchema,
});

export type PublicProject = z.infer<typeof publicProjectSchema> & {
  imageSrc: string;
};

export type PublicProjectsPagination = z.infer<typeof publicProjectsPaginationSchema>;

const fallbackProjectImages = [
  '/projects/project-1.jpg',
  '/projects/project-2.jpg',
  '/projects/project-3.jpg',
  '/projects/project-4.jpg',
  '/projects/project-5.jpg',
  '/projects/project-6.jpg',
];

const isPlaceholderUrl = (value: string) => value.includes('example.com');

const decodeHtmlEntities = (value: string) =>
  value
    .replace(/&laquo;/g, '<<')
    .replace(/&raquo;/g, '>>')
    .replace(/&amp;/g, '&');

const resolvePaginationPage = (url: string | null, page: number | null) => {
  if (typeof page === 'number' && page > 0) {
    return page;
  }

  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);
    const rawPage = parsedUrl.searchParams.get('page');

    if (!rawPage) {
      return null;
    }

    const parsedPage = Number(rawPage);
    return Number.isFinite(parsedPage) && parsedPage > 0 ? Math.floor(parsedPage) : null;
  } catch {
    return null;
  }
};

export const getPublicProjectsPageHref = (page: number) =>
  page <= 1 ? PUBLIC_PROJECTS_PATH : `${PUBLIC_PROJECTS_PATH}?page=${page}`;

const resolveProjectImage = (project: z.infer<typeof publicProjectSchema>, index = 0) => {
  const raw = project.image_url?.trim();

  if (!raw || isPlaceholderUrl(raw)) {
    return fallbackProjectImages[index % fallbackProjectImages.length];
  }

  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    return raw;
  }

  const normalizedPath = raw.startsWith('/') ? raw : `/${raw}`;
  return `${getLaravelApiBaseUrl()}${normalizedPath}`;
};

const toPublicProject = (
  project: z.infer<typeof publicProjectSchema>,
  index = 0
): PublicProject => ({
  ...project,
  sort_order: project.sort_order ?? null,
  role: project.role ?? null,
  client_region: project.client_region ?? null,
  problem: project.problem ?? null,
  solution: project.solution ?? null,
  outcome: project.outcome ?? null,
  imageSrc: resolveProjectImage(project, index),
});

const sortProjects = (projects: z.infer<typeof publicProjectSchema>[]) =>
  [...projects].sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1;
    }

    const leftSort = left.sort_order ?? Number.MAX_SAFE_INTEGER;
    const rightSort = right.sort_order ?? Number.MAX_SAFE_INTEGER;

    if (leftSort !== rightSort) {
      return leftSort - rightSort;
    }

    return left.id - right.id;
  });

export async function getPublicProjects() {
  return getPublicProjectsPage();
}

type PublicProjectsOptions = {
  page?: number;
  perPage?: number;
};

export async function getPublicProjectsPage({
  page = 1,
  perPage = PUBLIC_PROJECTS_PER_PAGE,
}: PublicProjectsOptions = {}) {
  try {
    const searchParams = new URLSearchParams({
      page: String(page),
      per_page: String(perPage),
    });

    const response = await fetch(getLaravelApiUrl(`/api/v1/projects?${searchParams.toString()}`), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return {
        projects: [] as PublicProject[],
        error: 'Unable to load projects from the public Laravel endpoint right now.',
      };
    }

    const payload = publicProjectsResponseSchema.parse((await response.json()) as unknown);
    const projects = sortProjects(payload.data).map((project, index) =>
      toPublicProject(project, index)
    );
    const paginationLinks = (payload.meta?.links ?? []).map((link) => {
      const resolvedPage = resolvePaginationPage(link.url, link.page);

      return {
        label: decodeHtmlEntities(link.label),
        page: resolvedPage,
        href: resolvedPage ? getPublicProjectsPageHref(resolvedPage) : null,
        active: link.active,
      };
    });

    return {
      projects,
      error: null,
      pagination: publicProjectsPaginationSchema.parse({
        ...(payload.meta ?? {}),
        links: paginationLinks,
      }),
    };
  } catch {
    return {
      projects: [] as PublicProject[],
      error:
        'Unable to reach the public projects endpoint right now. Check that the Laravel backend is running and reachable from the Next.js server.',
      pagination: null,
    };
  }
}

export async function getFeaturedPublicProjects(limit = 3) {
  const { projects, error } = await getPublicProjectsPage({
    page: 1,
    perPage: Math.max(PUBLIC_PROJECTS_PER_PAGE, 18),
  });

  return {
    projects: projects.slice(0, limit),
    error,
  };
}

export async function getPublicProjectBySlug(slug: string) {
  try {
    const response = await fetch(getLaravelApiUrl(`/api/v1/projects/${encodeURIComponent(slug)}`), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      cache: 'no-store',
    });

    if (response.status === 404) {
      return {
        project: null,
        error: null,
      };
    }

    if (!response.ok) {
      return {
        project: null,
        error: 'Unable to load this project from the public Laravel endpoint right now.',
      };
    }

    const payload = publicProjectItemResponseSchema.parse((await response.json()) as unknown);

    return {
      project: toPublicProject(payload.data),
      error: null,
    };
  } catch {
    return {
      project: null,
      error:
        'Unable to reach the public project detail endpoint right now. Check that the Laravel backend is running and reachable from the Next.js server.',
    };
  }
}
