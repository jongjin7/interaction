module.exports = {
  apps: [
    {
      name: 'pin-backapi',
      script: './bin/www',
      instances: 2,
      exec_mode: 'cluster',
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',

      // 개발 환경 설정
      env: {
        NODE_ENV: 'development', // NODE_ENV를 development로 설정
        PORT: 3002,
      },

      // 운영 환경 설정
      env_production: {
        NODE_ENV: 'production', // NODE_ENV를 production으로 설정
        PORT: 4002,
      },
    },
  ],
};
