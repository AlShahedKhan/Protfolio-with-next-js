import 'server-only';

type QuickLoginCredentials = {
  email: string;
  password: string;
};

const isEnabled = (value: string | undefined) => value === 'true';

export const isAdminQuickLoginEnabled = () =>
  isEnabled(process.env.ENABLE_ADMIN_QUICK_LOGIN) &&
  Boolean(process.env.ADMIN_QUICK_LOGIN_EMAIL?.trim()) &&
  Boolean(process.env.ADMIN_QUICK_LOGIN_PASSWORD?.trim());

export const getAdminQuickLoginCredentials = (): QuickLoginCredentials | null => {
  if (!isAdminQuickLoginEnabled()) {
    return null;
  }

  return {
    email: process.env.ADMIN_QUICK_LOGIN_EMAIL!.trim(),
    password: process.env.ADMIN_QUICK_LOGIN_PASSWORD!,
  };
};
