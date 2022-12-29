import Head from 'next/head'
import Layout from '@/layouts/home'
import AppConfig, { PageConfig } from '@/config'
import { fetchArticleHot, fetchArticleList, fetchTagsList } from '@/api/home'
import Sidebar from '@/pages/article/_sidebar'
import Content from './_content'

type PostPageProps = {
  articles: any
  hots: any
  tags: any
}

const category_id = 2
const Job = ({ articles, hots, tags }: PostPageProps) => {
  const { title, description } = AppConfig

  return (
    <Layout>
      <Head>
        <title>{`首页 - ${title}`}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="app-page-model app-job-model flex container mx-auto mt-6">
        <div className="app-main flex-1">
          <Content data={articles} category_id={category_id} />
        </div>
        <Sidebar tags={tags} hots={hots} />
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  const { rows: articles } = await fetchArticleList({ params: { ...PageConfig.base, category_id } })
  const { rows: hots } = await fetchArticleHot()
  const { rows: tags } = await fetchTagsList()

  return {
    props: {
      articles,
      hots,
      tags,
    },
  }
}

export default Job
