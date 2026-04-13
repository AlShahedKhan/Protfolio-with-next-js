'use client';

import type { ChangeEvent } from 'react';
import { useEffect, useMemo, useRef, useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ImageUp, LoaderCircle, Save, Sparkles, Trash2 } from 'lucide-react';
import { useForm, useWatch } from 'react-hook-form';
import {
  adminProjectFormSchema,
  buildAdminProjectFormData,
  buildAdminProjectPayload,
  buildAdminProjectUpdatePayload,
  defaultAdminProjectFormValues,
  getAdminProjectFormValues,
  resolveAdminProjectImageUrl,
  slugifyProjectTitle,
  type AdminProject,
  type AdminProjectFormInput,
} from '@/lib/admin-projects';

type ProjectApiErrorBody = {
  message?: string;
  errors?: Record<string, string[]>;
  formErrors?: string[];
};

type ProjectFormProps = {
  mode?: 'create' | 'edit';
  project?: AdminProject;
  projectSlug?: string;
};

const fieldClassName =
  'w-full rounded-2xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white outline-none transition-colors focus:border-cyan-400';
const imageUploadInputClassName =
  'block w-full cursor-pointer rounded-2xl border border-dashed border-slate-600 bg-slate-950/70 px-4 py-3 text-sm text-slate-300 transition-colors file:mr-4 file:rounded-full file:border-0 file:bg-cyan-500/15 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-cyan-200 hover:border-cyan-500/40';
const maxImageUploadSizeBytes = 5 * 1024 * 1024;

export default function ProjectForm({
  mode = 'create',
  project,
  projectSlug,
}: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formError, setFormError] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [selectedImagePreviewUrl, setSelectedImagePreviewUrl] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const selectedImagePreviewUrlRef = useRef<string | null>(null);
  const isEditMode = mode === 'edit';
  const [isSlugLocked, setIsSlugLocked] = useState(!isEditMode);
  const [hasMarkedImageForRemoval, setHasMarkedImageForRemoval] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    clearErrors,
      setError,
      setValue,
      formState: { errors, isSubmitting },
  } = useForm<AdminProjectFormInput>({
    resolver: zodResolver(adminProjectFormSchema),
    defaultValues: project ? getAdminProjectFormValues(project) : defaultAdminProjectFormValues,
  });

  const title = useWatch({ control, name: 'title' }) ?? '';
  const generatedSlug = useMemo(() => slugifyProjectTitle(title), [title]);
  const slugField = register('slug');
  const persistedImageUrl = useMemo(
    () => resolveAdminProjectImageUrl(project?.image_url ?? null),
    [project?.image_url]
  );
  const previewImageUrl =
    selectedImagePreviewUrl ?? (hasMarkedImageForRemoval ? null : persistedImageUrl);

  useEffect(() => {
    if (project) {
      setValue('title', project.title);
      setValue('slug', project.slug);
      setValue('description', project.description);
      setValue('technologiesText', project.technologies.join(', '));
      setValue('live_url', project.live_url ?? '');
      setValue('github_url', project.github_url ?? '');
      setValue('featured', project.featured);
      setValue('published', project.published);
      setValue('sort_order', project.sort_order?.toString() ?? '');
      setValue('role', project.role ?? '');
      setValue('client_region', project.client_region ?? '');
      setValue('problem', project.problem ?? '');
      setValue('solution', project.solution ?? '');
      setValue('outcome', project.outcome ?? '');
      setValue('confidential', project.confidential);
      setValue('remove_image', false);
    }
  }, [project, setValue]);

  useEffect(() => {
    if (isSlugLocked) {
      setValue('slug', generatedSlug, {
        shouldValidate: generatedSlug.length > 0,
        shouldDirty: generatedSlug.length > 0,
      });
    }
  }, [generatedSlug, isSlugLocked, setValue]);

  useEffect(() => {
    return () => {
      if (selectedImagePreviewUrlRef.current) {
        URL.revokeObjectURL(selectedImagePreviewUrlRef.current);
      }
    };
  }, []);

  const clearSelectedImageState = () => {
    if (selectedImagePreviewUrlRef.current) {
      URL.revokeObjectURL(selectedImagePreviewUrlRef.current);
      selectedImagePreviewUrlRef.current = null;
    }

    setSelectedImageFile(null);
    setSelectedImagePreviewUrl(null);

    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const handleImageFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0] ?? null;
    setImageError(null);

    if (!nextFile) {
      clearSelectedImageState();
      return;
    }

    if (!nextFile.type.startsWith('image/')) {
      event.target.value = '';
      clearSelectedImageState();
      setImageError('Please choose a valid image file.');
      return;
    }

    if (nextFile.size > maxImageUploadSizeBytes) {
      event.target.value = '';
      clearSelectedImageState();
      setImageError('Please choose an image smaller than 5 MB.');
      return;
    }

    clearSelectedImageState();

    const objectUrl = URL.createObjectURL(nextFile);
    selectedImagePreviewUrlRef.current = objectUrl;
    setSelectedImageFile(nextFile);
    setSelectedImagePreviewUrl(objectUrl);
    setHasMarkedImageForRemoval(false);
    setValue('remove_image', false, { shouldDirty: true });
  };

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      clearErrors();
      setFormError(null);
      setImageError(null);

      const endpoint = isEditMode
        ? `/api/admin/projects/${encodeURIComponent(projectSlug ?? project?.slug ?? values.slug)}`
        : '/api/admin/projects';
      const shouldUploadWithFormData = !isEditMode || Boolean(selectedImageFile);
      let response: Response;

      try {
        if (shouldUploadWithFormData) {
          const formData = buildAdminProjectFormData(values, {
            imageFile: selectedImageFile,
            ...(isEditMode ? { methodOverride: 'PATCH' as const } : {}),
          });

          response = await fetch(endpoint, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
            },
            body: formData,
          });
        } else {
          const payload = isEditMode
            ? buildAdminProjectUpdatePayload(values, {
                removeImage: values.remove_image || hasMarkedImageForRemoval,
              })
            : buildAdminProjectPayload(values);

          response = await fetch(endpoint, {
            method: isEditMode ? 'PATCH' : 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(payload),
          });
        }
      } catch {
        setFormError('Please review the form fields and try again.');
        return;
      }

      const body = (await response.json().catch(() => null)) as ProjectApiErrorBody | null;

      if (!response.ok) {
        const fieldErrors = body?.errors ?? {};

        const setFieldError = (field: keyof AdminProjectFormInput, apiField: string) => {
          const message = fieldErrors[apiField]?.[0];

          if (message) {
            setError(field, { type: 'server', message });
          }
        };

        setFieldError('title', 'title');
        setFieldError('slug', 'slug');
        setFieldError('description', 'description');
        setFieldError('technologiesText', 'technologies');
        setFieldError('live_url', 'live_url');
        setFieldError('github_url', 'github_url');
        setFieldError('sort_order', 'sort_order');
        setFieldError('role', 'role');
        setFieldError('client_region', 'client_region');
        setFieldError('problem', 'problem');
        setFieldError('solution', 'solution');
        setFieldError('outcome', 'outcome');

        if (fieldErrors.image?.[0]) {
          setImageError(fieldErrors.image[0]);
        }

        if (Object.keys(fieldErrors).length === 0) {
          setFormError(
            body?.formErrors?.[0] ??
              body?.message ??
              `Unable to ${isEditMode ? 'update' : 'create'} the project right now.`
          );
        }

        return;
      }

      router.push(`/admin/projects?${isEditMode ? 'updated=1' : 'created=1'}`);
      router.refresh();
    });
  });

  const isBusy = isPending || isSubmitting;
  const heading = isEditMode ? 'Edit project details' : 'Create a new portfolio project';
  const submitLabel = isEditMode ? 'Save changes' : 'Create project';
  const submitBusyLabel = isEditMode ? 'Saving changes...' : 'Saving project...';
  const summary = isEditMode
    ? 'Update an existing Laravel project record through the secure Next.js admin route. Text updates stay JSON-based, and image replacements use multipart upload when needed.'
    : 'This form posts through your Next.js admin route, which forwards the request to Laravel with the secure admin token and supports direct image upload.';

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6 rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Project Details
            </p>
            <h2 className="text-2xl font-bold text-white">{heading}</h2>
            <p className="text-sm leading-6 text-slate-400">{summary}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="title" className="text-sm font-medium text-slate-200">
                Title
              </label>
              <input
                id="title"
                {...register('title')}
                placeholder="Orfa AI"
                className={fieldClassName}
              />
              {errors.title && <p className="text-sm text-red-300">{errors.title.message}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="slug" className="text-sm font-medium text-slate-200">
                  Slug
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsSlugLocked(true);
                    setValue('slug', generatedSlug, { shouldValidate: true, shouldDirty: true });
                  }}
                  className="text-xs font-medium text-cyan-300 transition-colors hover:text-cyan-200"
                >
                  Regenerate from title
                </button>
              </div>
              <input
                id="slug"
                {...slugField}
                onChange={(event) => {
                  setIsSlugLocked(false);
                  slugField.onChange(event);
                }}
                placeholder="orfa-ai"
                className={fieldClassName}
              />
              <p className="text-xs text-slate-500">
                Lowercase letters, numbers, and hyphens only.
              </p>
              {errors.slug && <p className="text-sm text-red-300">{errors.slug.message}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="description" className="text-sm font-medium text-slate-200">
                Description
              </label>
              <textarea
                id="description"
                rows={5}
                {...register('description')}
                placeholder="Summarize the product, your contribution, and why the work mattered."
                className={`${fieldClassName} min-h-40 resize-y`}
              />
              {errors.description && (
                <p className="text-sm text-red-300">{errors.description.message}</p>
              )}
            </div>

            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center justify-between gap-3">
                <label htmlFor="image" className="text-sm font-medium text-slate-200">
                  Project image
                </label>
                {previewImageUrl && (
                  <span className="text-xs font-medium uppercase tracking-[0.22em] text-cyan-300">
                    {selectedImageFile ? 'New image selected' : 'Current backend image'}
                  </span>
                )}
              </div>

              <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-950/60 p-5">
                <div className="flex items-start gap-3 text-sm text-slate-400">
                  <ImageUp className="mt-0.5 h-5 w-5 text-cyan-300" />
                  <p>
                    Upload JPG, PNG, WebP, or SVG. Laravel stores the file and returns the new
                    `image_url` automatically.
                  </p>
                </div>

                <input
                  id="image"
                  name="image"
                  type="file"
                  ref={imageInputRef}
                  accept="image/*"
                  onChange={handleImageFileChange}
                  className={imageUploadInputClassName}
                />

                <div className="flex flex-col gap-2 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                  <p>Maximum recommended file size: 5 MB.</p>
                  {selectedImageFile && (
                    <button
                      type="button"
                      onClick={() => {
                        clearSelectedImageState();
                        setImageError(null);
                      }}
                      className="font-medium text-cyan-300 transition-colors hover:text-cyan-200"
                    >
                      Clear selected file
                    </button>
                  )}
                </div>

                {isEditMode && persistedImageUrl && !selectedImageFile && (
                  <label className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
                    <input
                      type="checkbox"
                      checked={hasMarkedImageForRemoval}
                      onChange={(event) => {
                        const shouldRemove = event.target.checked;
                        setHasMarkedImageForRemoval(shouldRemove);
                        setValue('remove_image', shouldRemove, { shouldDirty: true });
                      }}
                      className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-400 focus:ring-cyan-400"
                    />
                    <span>
                      <span className="inline-flex items-center gap-2 font-medium text-white">
                        <Trash2 className="h-4 w-4 text-amber-300" />
                        Remove current image
                      </span>
                      <span className="mt-1 block text-sm text-slate-400">
                        Save without selecting a new file to remove the current Laravel image.
                      </span>
                    </span>
                  </label>
                )}

                {previewImageUrl ? (
                  <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/70">
                    <div className="relative h-56 w-full">
                      <Image
                        src={previewImageUrl}
                        alt="Project preview"
                        fill
                        unoptimized
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-900/40 px-5 py-8 text-center text-sm text-slate-500">
                    {hasMarkedImageForRemoval
                      ? 'The current image will be removed when you save.'
                      : 'No project image selected yet.'}
                  </div>
                )}
              </div>

              {imageError && <p className="text-sm text-red-300">{imageError}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="technologiesText" className="text-sm font-medium text-slate-200">
                Technologies
              </label>
              <input
                id="technologiesText"
                {...register('technologiesText')}
                placeholder="Laravel, OpenAI API, Redis, Docker"
                className={fieldClassName}
              />
              <p className="text-xs text-slate-500">Separate each technology with a comma.</p>
              {errors.technologiesText && (
                <p className="text-sm text-red-300">{errors.technologiesText.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="live_url" className="text-sm font-medium text-slate-200">
                Live URL
              </label>
              <input
                id="live_url"
                {...register('live_url')}
                placeholder="https://product.example.com"
                className={fieldClassName}
              />
              {errors.live_url && (
                <p className="text-sm text-red-300">{errors.live_url.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="github_url" className="text-sm font-medium text-slate-200">
                GitHub URL
              </label>
              <input
                id="github_url"
                {...register('github_url')}
                placeholder="https://github.com/your-repo"
                className={fieldClassName}
              />
              {errors.github_url && (
                <p className="text-sm text-red-300">{errors.github_url.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6 rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
              Context
            </p>
            <h2 className="text-2xl font-bold text-white">Optional project metadata</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="role" className="text-sm font-medium text-slate-200">
                Role
              </label>
              <input
                id="role"
                {...register('role')}
                placeholder="Senior Laravel Developer"
                className={fieldClassName}
              />
              {errors.role && <p className="text-sm text-red-300">{errors.role.message}</p>}
            </div>

            <div className="space-y-2">
              <label htmlFor="client_region" className="text-sm font-medium text-slate-200">
                Client Region
              </label>
              <input
                id="client_region"
                {...register('client_region')}
                placeholder="USA"
                className={fieldClassName}
              />
              {errors.client_region && (
                <p className="text-sm text-red-300">{errors.client_region.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="sort_order" className="text-sm font-medium text-slate-200">
                Sort Order
              </label>
              <input
                id="sort_order"
                type="number"
                min="0"
                step="1"
                {...register('sort_order')}
                placeholder="1"
                className={fieldClassName}
              />
              {errors.sort_order && (
                <p className="text-sm text-red-300">{errors.sort_order.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-950/60 p-5">
            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                {...register('featured')}
                className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-400 focus:ring-cyan-400"
              />
              <span>
                <span className="block font-medium text-white">Featured project</span>
                <span className="text-sm text-slate-400">
                  Show this project more prominently across the portfolio.
                </span>
              </span>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                {...register('published')}
                className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-400 focus:ring-cyan-400"
              />
              <span>
                <span className="block font-medium text-white">Published</span>
                <span className="text-sm text-slate-400">
                  Make the project available to the public site.
                </span>
              </span>
            </label>

            <label className="flex items-start gap-3">
              <input
                type="checkbox"
                {...register('confidential')}
                className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 text-cyan-400 focus:ring-cyan-400"
              />
              <span>
                <span className="block font-medium text-white">Confidential client work</span>
                <span className="text-sm text-slate-400">
                  Use this for private projects where only summary details should be shown.
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="grid gap-6 rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">
            Case Study Notes
          </p>
          <h2 className="text-2xl font-bold text-white">Add a stronger project narrative</h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-2">
            <label htmlFor="problem" className="text-sm font-medium text-slate-200">
              Problem
            </label>
            <textarea
              id="problem"
              rows={5}
              {...register('problem')}
              placeholder="What challenge did the client or product team need solved?"
              className={`${fieldClassName} min-h-36 resize-y`}
            />
            {errors.problem && <p className="text-sm text-red-300">{errors.problem.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="solution" className="text-sm font-medium text-slate-200">
              Solution
            </label>
            <textarea
              id="solution"
              rows={5}
              {...register('solution')}
              placeholder="How did you approach the architecture, backend, and delivery?"
              className={`${fieldClassName} min-h-36 resize-y`}
            />
            {errors.solution && (
              <p className="text-sm text-red-300">{errors.solution.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="outcome" className="text-sm font-medium text-slate-200">
              Outcome
            </label>
            <textarea
              id="outcome"
              rows={5}
              {...register('outcome')}
              placeholder="What changed after launch or delivery?"
              className={`${fieldClassName} min-h-36 resize-y`}
            />
            {errors.outcome && <p className="text-sm text-red-300">{errors.outcome.message}</p>}
          </div>
        </div>
      </div>

      {formError && (
        <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {formError}
        </div>
      )}

      <div className="flex flex-col gap-4 rounded-[2rem] border border-slate-800 bg-slate-900/70 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3 text-sm text-slate-400">
          <Sparkles className="mt-0.5 h-4 w-4 text-cyan-300" />
          <p>
            Recommended: keep the title, summary, and technologies accurate first. You can expand
            the case-study notes later without changing the API shape.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/admin/projects"
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 px-5 py-3 font-semibold text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800"
          >
            <ArrowLeft size={18} />
            Back to projects
          </Link>
          <button
            type="submit"
            disabled={isBusy}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-3 font-semibold text-white transition-all hover:from-cyan-600 hover:to-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isBusy ? <LoaderCircle size={18} className="animate-spin" /> : <Save size={18} />}
            {isBusy ? submitBusyLabel : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}
