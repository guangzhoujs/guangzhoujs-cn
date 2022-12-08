import Head from 'next/head'
import Layout from '@/layouts/home'
import AppConfig from '@/config'
import { fetchArticleList } from '@/api/home'
import { Calendar, View, ThumbsUp, Category } from '@carbon/icons-react'
import { HotTag } from '@/bc/HotTag'
import { HotArticle } from '@/bc/HotArticle'
import Link from 'next/link'

type PostPageProps = {
  articles: any,
}

const Home = ({ articles }: PostPageProps) => {
  const { title, description } = AppConfig

  return (
    <Layout>
      <Head>
        <title>首页 - {title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="app-home-container flex container mx-auto mt-6">
        <div className="app-main flex-1">
          {articles.length > 0 && articles.map((r: any) => {
            return (
              <div key={r.id} className="article-item app-page-bg relative white mb-6">
                <h1>
                  <Link href={`/article/${r.id}`}><a target="_blank" rel="noreferrer">{r.title}</a></Link>
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
        </div>
        <div className="app-side w-96 ml-6">
          <HotTag />
          <HotArticle />
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  const { rows: articles } = await fetchArticleList()

  return {
    props: {
      articles,
    },
  }
}

export default Home
