module.exports = {
  apps: [{
    name: 'gzjs-ssr',
    script: 'npm',
    args: 'start',
    cwd: '/www/wwwroot/guangzhoujs.cn',
    autorestart: true,
    watch: true,
    // 不用监听的文件
    ignore_watch: [
      'node_modules',
      'logs'
    ],
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production',
      BASE_PATH: "",
      PORT: 3600
    }
  }]
}
