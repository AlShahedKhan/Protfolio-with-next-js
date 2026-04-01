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
      },
    },
  ],
};
