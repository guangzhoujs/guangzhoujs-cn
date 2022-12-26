import React from 'react'
import { Calendar, View, ThumbsUp, Category } from '@carbon/icons-react'
import Link from 'next/link'

const JobItem = ({ data: r }: any) => {
  if (!r?.id) return null

  const link = `/job/${r.id}`

  return (
    <div key={r.id} className="article-item app-page-bg relative white mb-6">
      <h1>
        <Link target="_blank" href={link} className="link" rel="noreferrer">{r.title}</Link>
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
          <Link title="Golang" href="/blog/category/17">
            <Category />
            <b>{r.category.title}</b>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default JobItem
