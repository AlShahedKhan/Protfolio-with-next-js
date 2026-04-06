import { z } from 'zod';

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
  image_url: nullableUrlString,
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
  image_url: z.string().trim().max(2048).optional().default(''),
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
});

export type AdminProjectFormInput = z.infer<typeof adminProjectFormSchema>;

export const defaultAdminProjectFormValues: AdminProjectFormInput = {
  title: '',
  slug: '',
  description: '',
  image_url: '',
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
};

export const getAdminProjectFormValues = (project: AdminProject): AdminProjectFormInput => ({
  title: project.title,
  slug: project.slug,
  description: project.description,
  image_url: project.image_url ?? '',
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
    image_url: values.image_url,
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
