import { useRootStore } from '@/providers/RootStoreProvider'
import config from '@/config'

export default function Footer() {
  const { appStore: { city } } = useRootStore()
  const year = (new Date()).getFullYear()

  return (
    <div className="app-footer">
      <div className="container flex items-center justify-between">
        <div className="app-footer-logo"><a href="/" className="text-blue-600">{config.title}</a></div>
        <div className="app-social" hidden />
        <div className="nav space-x-4 text-blue-600">
          <a href="/">首页</a>
          <a href="/help/about">关于</a>
          <a href="/help/contact">联系</a>
          <a href="/help/privacy" hidden> 隐私 </a>
          <a href="/help/update" hidden>更新日志</a>
        </div>
        <div className="copyright text-xs font-sans">
          <span className="mr-3"><a href="/" className="text-blue-600">{city?.host}</a></span>
          <span> © {year}. All rights reserved.</span>
        </div>
      </div>
    </div>
  )
}
