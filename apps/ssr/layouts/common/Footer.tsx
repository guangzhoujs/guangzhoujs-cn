import { useRootStore } from '@/providers/RootStoreProvider'

export default function Footer() {
  const { appStore: { city } } = useRootStore()
  const year = (new Date()).getFullYear()

  return (
    <div className="app-footer">
      <div className="container flex items-center justify-between">
        <div className="app-footer-logo">{city.shortname}前端交流</div>
        <div className="app-social" hidden />
        <div className="nav space-x-4">
          <a href="/">首页</a>
          <a href="/help/about">关于</a>
          <a href="/help/contact">联系</a>
          <a href="/help/privacy" hidden> 隐私 </a>
          <a href="/help/update" hidden>更新日志</a>
        </div>
        <div className="copyright text-xs">
          <span className="mr-3">{city?.host}</span>
          <span> © {year}. All rights reserved.</span>
        </div>
      </div>
    </div>
  )
}
