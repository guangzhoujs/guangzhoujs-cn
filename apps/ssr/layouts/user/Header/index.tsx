import { IsBrowser } from '@/components/IsBrowser'
import { useRootStore } from '@/providers/RootStoreProvider'
import HeaderSearch from '@/layouts/common/Search'
import UserInfo from '@/layouts/common/UserInfo'
import Logo from '@/public/images/logo.png'
import Image from 'next/image'
import Link from 'next/link'

export default function AppHeader() {
  const { appStore: { user } } = useRootStore()

  // 已登录
  const logined = <UserInfo user={user} />

  return (
    <div className="app-header app-user-header shadow-md">
      <div className="app-header-navbar white shadow-4 border-bottom pc-model px-8">
        <div className="app-header-main flex justify-between items-center">
          <div className="app-logo app-logo-on">
            <div className="logo-wrap">
              <Link href="/" rel="noreferrer">
                <Image alt="Vercel logo" src={Logo} width={45} height={45} />
              </Link>
            </div>
          </div>
          <div className="app-user-helper flex items-center">
            <div className="app-header-search">
              <HeaderSearch />
            </div>
            <div className="app-header-user">
              <IsBrowser>
                {logined}
              </IsBrowser>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
