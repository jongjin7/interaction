module.exports = {
  apps: [
    {
      name: 'pin-backapi',
      script: './bin/www',

      //script: './server.js', // // 앱 실행 스크립트

      instances: 2, // 클러스터 모드 사용 시 생성할 인스턴스 수
      exec_mode: 'cluster', // fork, cluster 모드 중 선택
      merge_logs: true, // 클러스터 모드 사용 시 각 클러스터에서 생성되는 로그를 한 파일로 합쳐준다.
      autorestart: true, // 프로세스 실패 시 자동으로 재시작할지 선택
      watch: false, // 파일이 변경되었을 때 재시작 할지 선택
      max_memory_restart: '512M', // 프로그램의 메모리 크기가 일정 크기 이상이 되면 재시작한다.
      env: {
        NODE_ENV: 'development',
        PORT: 3002,
      },
      env_production: {
        // 운영 환경설정 (--env production 옵션으로 지정할 수 있다.)
        NODE_ENV: 'production',
        PORT: 4002,
      },
    },
  ],

  deploy: {
    production: {
      user: 'jongjin', // 접속할 계정. SSH를 사용해서 서버에 접속할 수 있어야 한다.
      host: '192.168.0.5', // 서버 도메인 또는 IP
      //ref: 'origin/develop', // 서버에서 clone할 브랜치
      //repo: 'git@github.com:user/reponame.git', // Git 저장소 URL
      path: '/www/back', // 앱을 설치할 폴더 위치
      // PM2가 배포(git clone)한 후 실행할 명령어
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env prd',
    },
  },
};
