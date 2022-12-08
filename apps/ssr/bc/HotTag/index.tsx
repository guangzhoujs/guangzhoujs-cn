import { Category } from '@carbon/icons-react'
import { Space } from 'antd'

export function HotTag() {
  return (
    <div className="sider-items">
      <div className="sider-title">
        <h1><Category />热门标签</h1>
      </div>
      <div className="sider-content">
        <Space wrap>
          <a href="/t/gin/blogs" className="ml-1 badge-tag">gin</a>
          <a href="/t/gorm/blogs" className="ml-1 badge-tag">gorm</a>
          <a href="/t/goland/blogs" className="ml-1 badge-tag">goland</a>
          <a href="/t/%E5%BE%AE%E4%BF%A1/blogs" className="ml-1 badge-tag">微信</a>
          <a href="/t/vue3/blogs" className="ml-1 badge-tag">vue3</a>
          <a href="/t/swagger/blogs" className="ml-1 badge-tag">swagger</a>
          <a href="/t/nestjs/blogs" className="ml-1 badge-tag">nestjs</a>
          <a href="/t/%E5%BE%AE%E4%BF%A1%E5%B0%8F%E7%A8%8B%E5%BA%8F/blogs" className="ml-1 badge-tag">微信小程序</a>
          <a href="/t/%E5%B0%8F%E7%A8%8B%E5%BA%8F/blogs" className="ml-1 badge-tag">小程序</a>
        </Space>
      </div>
    </div>
  )
}
