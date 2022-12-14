import React, { useEffect, useState } from 'react'
import { Empty, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchArticleList } from '@/api/home'
import { PageConfig } from '@/config'
import Item from './post-item'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const Content = ({ data, category_id, parent_id }: any) => {
  const [, setPageNum] = useState(2)
  const [hasMore, setHasMore] = useState(true)
  const [posts, setPosts] = useState(data)
  const { limit } = PageConfig.base

  const getMoreArticle = (page = 2) => {
    setTimeout(async () => {
      const { rows: articles } = await fetchArticleList({ params: { page, limit, category_id, parent_id } })

      articles.length ? setPosts((post: any) => [...post, ...articles]) : setHasMore(false)
    }, 1000)
  }

  useEffect(() => {
    getMoreArticle()
  }, [])

  return (
    <>
      <InfiniteScroll
        dataLength={posts?.length}
        next={() => {
          setPageNum((old: number) => {
            const newPage = old + 1

            getMoreArticle(newPage)
            return newPage
          })
        }}
        style={{ overflow: 'visible' }}
        hasMore={hasMore}
        loader={(
          <div className="text-center mt-5">
            <Spin indicator={antIcon} />
          </div>
        )}
        endMessage={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
      >
        {posts.length > 0 && posts.map((r: any) => {
          return (
            <Item key={r.id} data={r} />
          )
        })}
      </InfiniteScroll>
    </>
  )
}

export default Content
