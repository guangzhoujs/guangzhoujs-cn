import { useRootStore } from '@/providers/RootStoreProvider'
import config from '@/config'
import Link from 'next/link'
import { IsBrowser } from '@/components/IsBrowser'

export default function Footer() {
  const { appStore: { city } } = useRootStore()
  const year = (new Date()).getFullYear()

  return (
    <div className="app-footer">
      <div className="container flex items-center justify-between">
        <div className="app-footer-logo"><Link href="/" className="text-blue-600">{config.title}</Link></div>
        <div className="app-social" hidden />
        <div className="nav space-x-4 text-blue-600">
          <Link href="/">首页</Link>
          <Link href="/help/about">关于</Link>
          <Link href="/help/contact">联系</Link>
          <Link href="/help/privacy" hidden> 隐私 </Link>
          <Link href="/help/update" hidden>更新日志</Link>
        </div>
        <IsBrowser>
          <div className="copyright text-xs font-sans">
            <span className="mr-3"><Link href="/" className="text-blue-600">{city?.host}</Link></span>
            <span> © {year}. All rights reserved.</span>
          </div>
        </IsBrowser>
      </div>
    </div>
  )
}
