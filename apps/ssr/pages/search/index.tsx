import { Calendar, View, ThumbsUp, Category } from '@carbon/icons-react'
import { fetchArticleHot, fetchArticleList, fetchTagsList } from '@/api/home'
import AppConfig, { PageConfig } from '@/config'
import Sidebar from '@/pages/article/_sidebar'
import Layout from '@/layouts/home'
import Head from 'next/head'
import Link from 'next/link'
import { Empty } from 'antd'

type PostPageProps = {
  articles: any,
  hots: any,
  tags: any
}

const parent_id = 1
const Search = ({ articles, hots, tags }: PostPageProps) => {
  const { title, description } = AppConfig

  return (
    <Layout>
      <Head>
        <title>{`首页 - ${title}`}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="app-home-container flex container mx-auto mt-6">
        <div className="app-main flex-1">
          <h3 style={{ height: '40px', lineHeight: '40px' }}>搜索结果：</h3>
          {articles.length > 0 && articles.map((r: any) => {
            return (
              <div key={r.id} className="article-item app-page-bg relative white mb-6">
                <h1>
                  <Link href={`/article/${r.id}`} target="_blank" rel="noreferrer">{r.title}</Link>
                </h1>
                <div className="article-body" dangerouslySetInnerHTML={{ __html: r.summary }} />
                <div className="article-footer flex justify-between">
                  <div className="title-info-list assist flex justify-between">
                    <div className="date">
                      <Calendar />
                      <b>{r.create_time}</b>
                    </div>
                    <i>/</i>
                    <div className="like">
                      <ThumbsUp />
                      <b>{r.likes}</b> 点赞
                    </div>
                    <i>/</i>
                    <div className="views">
                      <View />
                      <b>{r.views}</b> 阅读
                    </div>
                  </div>
                  <div className="category">
                    <a title="Golang" href="/blog/category/17">
                      <Category />
                      <b>{r.category.title}</b>
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
          {!articles.length && <div className="article-item app-home-empty app-page-bg relative white mb-6"><Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /></div>}
        </div>
        <Sidebar tags={tags} hots={hots} />
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ query }: any) {
  const { keywords } = query
  const { rows: articles } = await fetchArticleList({ params: { ...PageConfig.base, parent_id, title: keywords } })
  const { rows: hots } = await fetchArticleHot()
  const { rows: tags } = await fetchTagsList()

  return {
    props: { articles, hots, tags },
  }
}

export default Search
