const fs = require('node:fs');
const path = require('node:path');

const parseEnvFile = (filePath) => {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  return fs
    .readFileSync(filePath, 'utf8')
    .split(/\r?\n/)
    .reduce((env, line) => {
      const trimmed = line.trim();

      if (!trimmed || trimmed.startsWith('#')) {
        return env;
      }

      const separatorIndex = trimmed.indexOf('=');
      if (separatorIndex < 1) {
        return env;
      }

      const key = trimmed.slice(0, separatorIndex).trim();
      const rawValue = trimmed.slice(separatorIndex + 1).trim();
      const unquoted =
        (rawValue.startsWith('"') && rawValue.endsWith('"')) ||
        (rawValue.startsWith("'") && rawValue.endsWith("'"))
          ? rawValue.slice(1, -1)
          : rawValue;

      env[key] = unquoted;
      return env;
    }, {});
};

const envFromLocal = parseEnvFile(path.join(__dirname, '.env.local'));

module.exports = {
  apps: [
    {
      name: 'portfolio-pro',
      script: 'server.js',
      cwd: `${__dirname}/.next/standalone`,
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        HOSTNAME: '127.0.0.1',
        LARAVEL_API_BASE_URL:
          process.env.LARAVEL_API_BASE_URL ||
          envFromLocal.LARAVEL_API_BASE_URL ||
          'http://localhost:8000',
        NEXT_PUBLIC_API_URL:
          process.env.NEXT_PUBLIC_API_URL ||
          envFromLocal.NEXT_PUBLIC_API_URL ||
          'http://localhost:8000/api',
      },
    },
  ],
};
