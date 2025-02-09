module.exports = {
  apps: [
    {
      name: 'pin-gallery-backend',
      script: './bin/www', // 실행 스크립트
      instances: '2', // 1개 프로세스 실행 (멀티코어 활용하려면 'max' 또는 개수 지정)
      exec_mode: 'fork', // 'fork' 또는 'cluster' 사용 가능
      watch: process.env.NODE_ENV === 'development', // 파일 변경 감지하여 자동 재시작 (개발 환경에서만 true 추천)
      autorestart: true, // 자동 재시작 활성화
      restart_delay: 5000, // 재시작 간격 (5초)
      max_restarts: 10, // 최대 재시작 횟수
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
