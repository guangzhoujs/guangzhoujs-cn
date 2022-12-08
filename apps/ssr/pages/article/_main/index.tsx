import { Calendar, View, ThumbsUp, Category } from '@carbon/icons-react'
import Link from 'next/link'
import { Empty } from 'antd'

type PostPageProps = {
  articles: any,
}

const Main = ({ articles }: PostPageProps) => {
  return (
    <div className="app-article-main flex-1 app-page-bg">
      <div className="app-article-content">
        {articles.length > 0 && articles.map((r: any) => {
          return (
            <div key={r.id} className="article-item relative white p-6">
              <h1>
                <Link href={`/article/${r.id}`}><a target="_blank" rel="noreferrer">{r.title}</a></Link>
              </h1>
              <div className="article-body" dangerouslySetInnerHTML={{ __html: r.summary }} />
              <div className="article-footer flex justify-between">
                <div className="title-info-list flex justify-between">
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
        {!articles?.length && <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      </div>
    </div>
  )
}

export default Main
