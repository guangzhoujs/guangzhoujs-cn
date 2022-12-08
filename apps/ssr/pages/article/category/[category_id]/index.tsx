import Head from 'next/head'
import Layout from '@/layouts/home'
import AppConfig from '@/config'
import Nav from '../../_nav'
import Sidebar from '../../_sidebar'
import Main from '../../_main'
import { fetchArticleCategory, fetchArticleList } from '@/api/home'

type PostPageProps = {
  categories: any
  articles: any
}

const Hero = ({ categories, articles }: PostPageProps) => {
  const { title, description } = AppConfig

  return (
    <Layout>
      <Head>
        <title>首页 - {title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="app-page-model app-article-model flex container mx-auto my-6 justify-end">
        <Nav categories={categories[0]?.children} />
        <Main articles={articles} />
        <Sidebar />
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }: any) {
  const { category_id } = params
  const aparams = {}

  category_id !== '0' && Object.assign(aparams, { category_id })
  const { rows: categories } = await fetchArticleCategory()
  const { rows: articles } = await fetchArticleList({ params: aparams })
  categories[0].children.unshift({ id: 0, title: '全部' })

  return { props: { categories, articles } }
}

export default Hero
