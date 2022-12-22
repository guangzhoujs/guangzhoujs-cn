import Head from 'next/head'
import Layout from '@/layouts/home'
import AppConfig, { PageConfig } from '@/config'
import Nav from '../../_nav'
import Sidebar from '../../_sidebar'
import Main from '../../_main'
import { fetchArticleCategory, fetchArticleHot, fetchArticleList, fetchTagsList } from '@/api/home'

type PostPageProps = {
  categories: any
  articles: any
  hots: any
  tags: any
  category_id: string
}

const parent_id = 1
const Hero = ({ categories, articles, category_id, hots, tags }: PostPageProps) => {
  const { title, description } = AppConfig

  return (
    <Layout>
      <Head>
        <title>首页 - {title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="app-page-model app-article-model flex container mx-auto my-6 justify-end">
        <Nav categories={categories[0]?.children} />
        <Main data={articles} parent_id={parent_id} category_id={category_id} />
        <Sidebar tags={tags} hots={hots} />
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }: any) {
  const { category_id } = params
  const aparams = { ...PageConfig.base }

  Object.assign(aparams, { category_id })

  const { rows: categories } = await fetchArticleCategory()
  const { rows: articles } = await fetchArticleList({ params: aparams })
  const { rows: hots } = await fetchArticleHot()
  const { rows: tags } = await fetchTagsList()

  categories[0]?.children.unshift({ id: 0, title: '全部' })

  return { props: { categories, articles, category_id, hots, tags } }
}

export default Hero
