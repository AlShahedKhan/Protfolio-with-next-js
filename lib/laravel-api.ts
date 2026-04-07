const normalizeBaseUrl = (value: string) => {
  const trimmed = value.trim().replace(/\/+$/, '');
  return trimmed.endsWith('/api') ? trimmed.slice(0, -4) : trimmed;
};

export const getLaravelApiBaseUrl = () => {
  const configuredBaseUrl =
    process.env.LARAVEL_API_BASE_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

  return normalizeBaseUrl(configuredBaseUrl);
};

export const getLaravelApiUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getLaravelApiBaseUrl()}${normalizedPath}`;
};
