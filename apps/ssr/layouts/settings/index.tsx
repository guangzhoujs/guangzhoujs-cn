import { Layout } from 'antd'
import AppContent from '../user/Content'
import AppHeader from './Header'
import AppSider from './Sider'

export default function SettingsLayout({ children }: any) {
  return (
    <Layout hasSider className="app-settings-layout">
      <AppHeader />
      <Layout className="container" style={{ minHeight: '100vh' }}>
        <AppSider />
        <AppContent propChildren={children} />
      </Layout>
    </Layout>
  )
}
