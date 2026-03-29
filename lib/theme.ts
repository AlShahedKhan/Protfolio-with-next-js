// Theme Configuration
// Customize colors, spacing, and other design tokens

export const theme = {
  colors: {
    // Primary Brand Colors
    primary: {
      50: '#e0f2fe',
      100: '#b6e4fc',
      200: '#7dd3fc',
      300: '#38bdf8',
      400: '#0ea5e9',
      500: '#0284c7',
      600: '#0369a1',
      700: '#075985',
      800: '#0c4a6e',
      900: '#082f49',
    },
    // Accent - Cyan
    accent: {
      50: '#ecf0ff',
      100: '#cce0ff',
      200: '#99c1ff',
      300: '#66a3ff',
      400: '#3384ff',
      500: '#0066ff',
      600: '#0052cc',
      700: '#003d99',
      800: '#002966',
      900: '#001533',
    },
    // Neutral - Slate
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    // Status Colors
    status: {
      success: '#10b981',
      warning: '#f59e0b',
      danger: '#ef4444',
      info: '#3b82f6',
    },
  },

  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
  },

  borderRadius: {
    none: '0',
    sm: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  typography: {
    fontFamily: {
      sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
    },
    fontSize: {
      xs: '0.75rem',     // 12px
      sm: '0.875rem',    // 14px
      base: '1rem',      // 16px
      lg: '1.125rem',    // 18px
      xl: '1.25rem',     // 20px
      '2xl': '1.5rem',   // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem',  // 36px
      '5xl': '3rem',     // 48px
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.75,
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  },

  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    glow: '0 0 20px rgba(6, 182, 212, 0.3)',
  },

  animations: {
    fadeIn: 'fadeIn 0.6s ease-out',
    slideInUp: 'slideInUp 0.6s ease-out',
    slideInDown: 'slideInDown 0.6s ease-out',
    scaleIn: 'scaleIn 0.6s ease-out',
    float: 'float 3s ease-in-out infinite',
    glow: 'glow 2s ease-in-out infinite',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },

  transitions: {
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '1000ms',
  },

  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },

  zIndex: {
    auto: 'auto',
    0: '0',
    10: '10',
    20: '20',
    30: '30',
    40: '40',
    50: '50',
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    modal: '1040',
    popover: '1050',
    tooltip: '1070',
  },
};

// CSS Variable generation
export const getCSSVariables = () => {
  const variables: Record<string, string> = {};

  // Colors
  Object.entries(theme.colors).forEach(([colorName, colorShades]) => {
    if (typeof colorShades === 'object') {
      Object.entries(colorShades).forEach(([shade, value]) => {
        variables[`--color-${colorName}-${shade}`] = value;
      });
    }
  });

  return variables;
};

// Utility for combining theme values
export const themeValue = (path: string, defaultValue = ''): string => {
  const keys = path.split('.');
  let value: unknown = theme;

  for (const key of keys) {
    if (typeof value !== 'object' || value === null) return defaultValue;
    value = (value as Record<string, unknown>)[key];
    if (value === undefined) return defaultValue;
  }

  return String(value);
};

export default theme;
