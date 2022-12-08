import { Layout } from 'antd'
import AppContent from './Content'
import AppHeader from './Header'
import AppSider from './Sider'

export default function UserLayout({ children }: any) {
  return (
    <Layout hasSider className="ant-layout-has-sider">
      <AppSider />
      <Layout style={{ minHeight: '100vh' }}>
        <AppHeader />
        <AppContent propChildren={children} />
      </Layout>
    </Layout>
  )
}
