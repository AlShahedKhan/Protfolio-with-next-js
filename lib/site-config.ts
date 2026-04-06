const isFeatureEnabled = (value: string | undefined, defaultValue = false) => {
  if (value === undefined) {
    return defaultValue;
  }

  return value === 'true';
};

export const siteFeatures = {
  adminPreview: isFeatureEnabled(process.env.ENABLE_PORTFOLIO_ADMIN_PREVIEW, true),
  mockApi: isFeatureEnabled(process.env.ENABLE_PORTFOLIO_MOCK_API),
} as const;

export const getSiteUrl = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? '';

  return siteUrl.trim() || null;
};
