import { z } from 'zod';
import { getLaravelApiBaseUrl } from '@/lib/laravel-api';

const emptyStringToNull = (value: unknown) => {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  return trimmed.length === 0 ? null : trimmed;
};

const nullableTrimmedString = (maxLength: number) =>
  z.preprocess(emptyStringToNull, z.string().trim().max(maxLength).nullable());

const nullableUrlString = z.preprocess(
  emptyStringToNull,
  z.string().trim().url('Enter a valid URL.').max(2048).nullable()
);

export const adminProjectSchema = z.object({
  id: z.number().int().nonnegative(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  image_url: z.string().nullable(),
  technologies: z.array(z.string()),
  live_url: z.string().nullable(),
  github_url: z.string().nullable(),
  featured: z.boolean(),
  published: z.boolean(),
  sort_order: z.number().int().nonnegative().nullable(),
  role: z.string().nullable(),
  client_region: z.string().nullable(),
  problem: z.string().nullable(),
  solution: z.string().nullable(),
  outcome: z.string().nullable(),
  confidential: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type AdminProject = z.infer<typeof adminProjectSchema>;

export const adminProjectSlugSchema = z.object({
  slug: z.string().trim().min(1, 'Project slug is required.').max(255),
});

export const adminProjectCreateSchema = z.object({
  title: z.string().trim().min(2, 'Title must be at least 2 characters.').max(255),
  slug: z
    .string()
    .trim()
    .min(2, 'Slug must be at least 2 characters.')
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and hyphens only.'),
  description: z
    .string()
    .trim()
    .min(20, 'Description should be at least 20 characters.')
    .max(5000),
  technologies: z
    .array(z.string().trim().min(1).max(100))
    .min(1, 'Add at least one technology.')
    .max(20, 'Keep the technology list focused.'),
  live_url: nullableUrlString,
  github_url: nullableUrlString,
  featured: z.boolean(),
  published: z.boolean(),
  sort_order: z.number().int().nonnegative().nullable(),
  role: nullableTrimmedString(255),
  client_region: nullableTrimmedString(255),
  problem: nullableTrimmedString(3000),
  solution: nullableTrimmedString(3000),
  outcome: nullableTrimmedString(3000),
  confidential: z.boolean(),
});

export type AdminProjectCreateInput = z.infer<typeof adminProjectCreateSchema>;

export const adminProjectUpdateSchema = adminProjectCreateSchema
  .partial()
  .extend({
    remove_image: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'Provide at least one field to update.',
  });

export type AdminProjectUpdateInput = z.infer<typeof adminProjectUpdateSchema>;

export const adminProjectFormSchema = z.object({
  title: z.string().trim().min(2, 'Title must be at least 2 characters.').max(255),
  slug: z
    .string()
    .trim()
    .min(2, 'Slug must be at least 2 characters.')
    .max(255)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Use lowercase letters, numbers, and hyphens only.'),
  description: z
    .string()
    .trim()
    .min(20, 'Description should be at least 20 characters.')
    .max(5000),
  technologiesText: z.string().trim().min(1, 'Add at least one technology.'),
  live_url: z.string().trim().max(2048).optional().default(''),
  github_url: z.string().trim().max(2048).optional().default(''),
  featured: z.boolean(),
  published: z.boolean(),
  sort_order: z.string().trim().optional().default(''),
  role: z.string().trim().max(255).optional().default(''),
  client_region: z.string().trim().max(255).optional().default(''),
  problem: z.string().trim().max(3000).optional().default(''),
  solution: z.string().trim().max(3000).optional().default(''),
  outcome: z.string().trim().max(3000).optional().default(''),
  confidential: z.boolean(),
  remove_image: z.boolean().optional().default(false),
});

export type AdminProjectFormInput = z.infer<typeof adminProjectFormSchema>;

export const defaultAdminProjectFormValues: AdminProjectFormInput = {
  title: '',
  slug: '',
  description: '',
  technologiesText: '',
  live_url: '',
  github_url: '',
  featured: true,
  published: true,
  sort_order: '',
  role: '',
  client_region: '',
  problem: '',
  solution: '',
  outcome: '',
  confidential: false,
  remove_image: false,
};

export const getAdminProjectFormValues = (project: AdminProject): AdminProjectFormInput => ({
  title: project.title,
  slug: project.slug,
  description: project.description,
  technologiesText: project.technologies.join(', '),
  live_url: project.live_url ?? '',
  github_url: project.github_url ?? '',
  featured: project.featured,
  published: project.published,
  sort_order: project.sort_order?.toString() ?? '',
  role: project.role ?? '',
  client_region: project.client_region ?? '',
  problem: project.problem ?? '',
  solution: project.solution ?? '',
  outcome: project.outcome ?? '',
  confidential: project.confidential,
  remove_image: false,
});

export const splitTechnologies = (value: string) =>
  Array.from(
    new Set(
      value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );

export const slugifyProjectTitle = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');

export const buildAdminProjectPayload = (
  values: AdminProjectFormInput
): AdminProjectCreateInput => {
  const trimmedSortOrder = values.sort_order.trim();

  return adminProjectCreateSchema.parse({
    title: values.title,
    slug: values.slug,
    description: values.description,
    technologies: splitTechnologies(values.technologiesText),
    live_url: values.live_url,
    github_url: values.github_url,
    featured: values.featured,
    published: values.published,
    sort_order: trimmedSortOrder.length > 0 ? Number(trimmedSortOrder) : null,
    role: values.role,
    client_region: values.client_region,
    problem: values.problem,
    solution: values.solution,
    outcome: values.outcome,
    confidential: values.confidential,
  });
};

export const buildAdminProjectUpdatePayload = (
  values: AdminProjectFormInput,
  options: { removeImage?: boolean } = {}
): AdminProjectUpdateInput =>
  adminProjectUpdateSchema.parse({
    ...buildAdminProjectPayload(values),
    ...(options.removeImage ? { remove_image: true } : {}),
  });

export const buildAdminProjectFormData = (
  values: AdminProjectFormInput,
  options: {
    imageFile?: File | null;
    methodOverride?: 'PATCH';
  } = {}
) => {
  const payload = buildAdminProjectPayload(values);
  const formData = new FormData();

  if (options.methodOverride) {
    formData.set('_method', options.methodOverride);
  }

  formData.set('title', payload.title);
  formData.set('slug', payload.slug);
  formData.set('description', payload.description);
  payload.technologies.forEach((technology) => {
    formData.append('technologies[]', technology);
  });
  formData.set('featured', payload.featured ? '1' : '0');
  formData.set('published', payload.published ? '1' : '0');
  formData.set('confidential', payload.confidential ? '1' : '0');
  formData.set('live_url', payload.live_url ?? '');
  formData.set('github_url', payload.github_url ?? '');
  formData.set('sort_order', payload.sort_order !== null ? String(payload.sort_order) : '');
  formData.set('role', payload.role ?? '');
  formData.set('client_region', payload.client_region ?? '');
  formData.set('problem', payload.problem ?? '');
  formData.set('solution', payload.solution ?? '');
  formData.set('outcome', payload.outcome ?? '');

  if (options.imageFile) {
    formData.set('image', options.imageFile);
  }

  return formData;
};

export const resolveAdminProjectImageUrl = (imageUrl?: string | null) => {
  if (!imageUrl) {
    return null;
  }

  const raw = imageUrl.trim();

  if (!raw || raw.includes('example.com')) {
    return null;
  }

  if (raw.startsWith('http://') || raw.startsWith('https://')) {
    return raw;
  }

  const normalizedPath = raw.startsWith('/') ? raw : `/${raw}`;
  return `${getLaravelApiBaseUrl()}${normalizedPath}`;
};

export const extractAdminProjects = (payload: unknown): AdminProject[] => {
  if (Array.isArray(payload)) {
    return z.array(adminProjectSchema).parse(payload);
  }

  if (payload && typeof payload === 'object' && Array.isArray((payload as { data?: unknown }).data)) {
    return z.array(adminProjectSchema).parse((payload as { data: unknown[] }).data);
  }

  return [];
};

export const extractAdminProject = (payload: unknown): AdminProject =>
  adminProjectSchema.parse((payload as { data?: unknown })?.data);

export const extractApiMessage = (payload: unknown, fallback: string) => {
  if (
    payload &&
    typeof payload === 'object' &&
    'message' in payload &&
    typeof (payload as { message?: unknown }).message === 'string'
  ) {
    return (payload as { message: string }).message;
  }

  return fallback;
};
