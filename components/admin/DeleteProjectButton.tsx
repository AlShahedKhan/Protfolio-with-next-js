'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { LoaderCircle, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

type DeleteProjectButtonProps = {
  slug: string;
  title: string;
};

type DeleteResponseBody = {
  message?: string;
};

export default function DeleteProjectButton({ slug, title }: DeleteProjectButtonProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = () => {
    startTransition(async () => {
      setError(null);

      const response = await fetch(`/api/admin/projects/${encodeURIComponent(slug)}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
        },
      });

      const body = (await response.json().catch(() => null)) as DeleteResponseBody | null;

      if (!response.ok) {
        setError(body?.message ?? 'Unable to delete the project right now.');
        return;
      }

      setOpen(false);
      router.replace('/admin/projects?deleted=1');
      router.refresh();
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm font-medium text-red-200 transition-colors hover:bg-red-500/20">
          <Trash2 size={16} />
          Delete
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="border-slate-800 bg-slate-950 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this project?</AlertDialogTitle>
          <AlertDialogDescription className="text-slate-400">
            This will permanently remove <span className="font-semibold text-slate-200">{title}</span>{' '}
            from the Laravel backend.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            {error}
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel className="border-slate-700 bg-slate-900 text-slate-200 hover:bg-slate-800">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={(event) => {
              event.preventDefault();
              handleDelete();
            }}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {isPending ? <LoaderCircle size={16} className="animate-spin" /> : <Trash2 size={16} />}
            {isPending ? 'Deleting...' : 'Delete project'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
