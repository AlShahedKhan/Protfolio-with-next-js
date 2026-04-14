const normalizeBaseUrl = (value: string) => {
  const trimmed = value.trim().replace(/\/+$/, '');
  return trimmed.endsWith('/api') ? trimmed.slice(0, -4) : trimmed;
};

export const getLaravelApiBaseUrl = () => {
  const configuredBaseUrl =
    process.env.LARAVEL_API_BASE_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

  return normalizeBaseUrl(configuredBaseUrl);
};

export const getLaravelFallbackApiBaseUrl = () => {
  const configuredBaseUrl = process.env.LARAVEL_API_FALLBACK_BASE_URL ?? '';
  return configuredBaseUrl ? normalizeBaseUrl(configuredBaseUrl) : '';
};

export const getLaravelApiCandidateBaseUrls = () =>
  [...new Set([getLaravelApiBaseUrl(), getLaravelFallbackApiBaseUrl()].filter(Boolean))];

export const getLaravelApiUrl = (path: string) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getLaravelApiBaseUrl()}${normalizedPath}`;
};

const isLocalAssetHost = (hostname: string) =>
  hostname === 'localhost' ||
  hostname === '127.0.0.1' ||
  hostname === '::1' ||
  hostname.endsWith('.test');

export const resolveLaravelAssetUrl = (rawUrl: string) => {
  const raw = rawUrl.trim();
  if (!raw) {
    return raw;
  }

  const baseUrl = getLaravelApiBaseUrl();
  const normalizedPath = raw.startsWith('/') ? raw : `/${raw}`;

  if (!raw.startsWith('http://') && !raw.startsWith('https://')) {
    return `${baseUrl}${normalizedPath}`;
  }

  try {
    const parsed = new URL(raw);
    const apiBase = new URL(baseUrl);

    if (isLocalAssetHost(parsed.hostname)) {
      return `${apiBase.origin}${parsed.pathname}${parsed.search}${parsed.hash}`;
    }

    if (parsed.pathname.startsWith('/storage/') && parsed.origin !== apiBase.origin) {
      return `${apiBase.origin}${parsed.pathname}${parsed.search}${parsed.hash}`;
    }

    return raw;
  } catch {
    return `${baseUrl}${normalizedPath}`;
  }
};

type FetchLaravelApiResult = {
  response: Response | null;
  url: string | null;
};

export async function fetchLaravelApi(path: string, init: RequestInit = {}): Promise<FetchLaravelApiResult> {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const baseUrls = getLaravelApiCandidateBaseUrls();

  let lastResponse: Response | null = null;
  let lastUrl: string | null = null;

  for (const baseUrl of baseUrls) {
    const url = `${baseUrl}${normalizedPath}`;

    try {
      const response = await fetch(url, init);

      if (response.ok) {
        return { response, url };
      }

      if (response.status < 500) {
        return { response, url };
      }

      lastResponse = response;
      lastUrl = url;
    } catch {
      lastUrl = url;
    }
  }

  return { response: lastResponse, url: lastUrl };
}
