const DEFAULT_DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
};

export function formatDate(
  dateString: string,
  options: Intl.DateTimeFormatOptions = DEFAULT_DATE_OPTIONS,
) {
  return new Intl.DateTimeFormat('en-US', options).format(
    new Date(`${dateString}T00:00:00Z`),
  );
}
