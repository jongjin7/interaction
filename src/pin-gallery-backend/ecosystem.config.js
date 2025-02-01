module.exports = {
  apps: [
    {
      name: 'pin-backapi', // 애플리케이션 이름 (PM2 프로세스 리스트에서 확인 가능)
      script: './bin/www', // 실행할 Node.js 애플리케이션 파일
      instances: 2, // 클러스터 모드에서 실행할 인스턴스 개수
      exec_mode: 'cluster', // 실행 모드 (fork 또는 cluster)
      merge_logs: true, // 여러 인스턴스의 로그를 하나의 파일로 합침
      autorestart: true, // 애플리케이션이 비정상 종료되면 자동 재시작
      watch: false, // 파일 변경 감지 시 자동 재시작 (현재 비활성화)
      max_memory_restart: '512M', // 메모리가 512MB를 초과하면 프로세스 재시작

      // 개발 환경 설정
      env: {
        NODE_ENV: 'development',
        PORT: 3002,
      },

      // 운영 환경 설정
      env_production: {
        NODE_ENV: 'production',
        PORT: 4002,
      },
    },
  ],
};
