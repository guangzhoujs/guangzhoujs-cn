import React from 'react'
import { Calendar, View, ThumbsUp, Category } from '@carbon/icons-react'
import Link from 'next/link'

const Item = ({ data: r }: any) => {
  if (!r?.id) return null

  return (
    <div data-key={r?.id} className="article-item relative white p-2">
      <h1>
        <Link href={`/article/${r?.id}`} target="_blank" rel="noreferrer">{r.title}</Link>
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
          <Link title="Golang" href="/blog/category/17">
            <Category />
            <b>{r.category.title}</b>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Item
