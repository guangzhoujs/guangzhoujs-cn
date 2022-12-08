import pkg from '../package.json'

// 存储key
export const StoreKey = 'gz-js'

// 分页配置
export const PageConfig: any = {
  base: { current: 1, pageSize: 10, limit: 10 },
  options: { showQuickJumper: true, current: 1, pageSize: 10, showSizeChanger: true, pageSizeOptions: ['5', '10', '20', '30', '50', '100'] },
}

// 基础配置
export default {
  name: pkg.name,
  version: pkg.version,
  title: '广州前端交流',
  author: 'Admin',
  description: '广州前端交流',
}
