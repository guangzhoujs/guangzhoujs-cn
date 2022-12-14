import Head from 'next/head'
import UserLayout from '@/layouts/user'
import AppConfig, { PageConfig } from '@/config'
import { fetchArticleList } from '@/api/home'
import Content from '../_common/post-content'

type PostPageProps = {
  articles: any
}

const parent_id = 1
const Article = ({ articles }: PostPageProps) => {
  const { title, description } = AppConfig

  return (
    <UserLayout>
      <Head>
        <title>首页 - {title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="app-user-page-model">
        <Content data={articles} parent_id={parent_id} />
      </div>
    </UserLayout>
  )
}

export async function getServerSideProps() {
  const { rows: articles } = await fetchArticleList({ params: { ...PageConfig.base, parent_id } })

  return { props: { articles } }
}

export default Article
