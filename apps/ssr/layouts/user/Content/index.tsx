import { Layout } from 'antd'

const { Content } = Layout

export default function AppContent({ propChildren }: any) {
  return (
    <Content className="app-user-content">
      <main className="app-user-main my-6">{propChildren}</main>
    </Content>
  )
}
