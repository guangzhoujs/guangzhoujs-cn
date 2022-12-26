import Head from 'next/head'
import UserLayout from '@/layouts/user'
import AppConfig from '@/config'

const Qa = () => {
  const { title, description } = AppConfig

  return (
    <UserLayout>
      <Head>
        <title>{`首页 - ${title}`}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="app-user-page-model">
        Qa
      </div>
    </UserLayout>
  )
}

export default Qa
