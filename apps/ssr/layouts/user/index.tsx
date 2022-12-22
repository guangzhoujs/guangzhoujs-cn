import { Layout } from 'antd'
import Footer from '../common/Footer'
import AppContent from './Content'
import AppHeader from './Header'
import AppSider from './Sider'

export default function UserLayout({ children }: any) {
  return (
    <Layout>
      <AppHeader />
      <Layout className="app-user-layout container">
        <AppSider />
        <AppContent propChildren={children} />
      </Layout>
      <Footer />
    </Layout>
  )
}
