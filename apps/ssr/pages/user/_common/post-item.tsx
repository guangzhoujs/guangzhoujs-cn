import React from 'react'
import { Button, Popconfirm } from 'antd'
import { Calendar, View, ThumbsUp, Category } from '@carbon/icons-react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Link from 'next/link'

const Item = ({ data: r }: any) => {
  const editType = r.md ? 'type=md&' : ''
  const onDelete = (id: string) => {
    alert(id)
  }

  return (
    <div data-key={r.id} className="article-item relative white p-2">
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
      <div className="action absolute">
        <Link href={`/editor?${editType}id=${r.id}`}>
          <a target="_blank" rel="noreferrer">
            <Button type="link" icon={<EditOutlined />}>编辑</Button>
          </a>
        </Link>
        <Popconfirm title="确认要删除吗?" onConfirm={() => onDelete(r.id)}>
          <Button type="link" danger icon={<DeleteOutlined />}>删除</Button>
        </Popconfirm>
      </div>
    </div>
  )
}

export default Item
