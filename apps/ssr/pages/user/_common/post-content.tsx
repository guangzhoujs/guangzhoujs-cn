import React, { useEffect, useState } from 'react'
import { Empty, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchUserArticleList } from '@/api/home'
import { useRouter } from 'next/router'
import { PageConfig } from '@/config'
import Item from './post-item'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

const Content = ({ data, category_id, parent_id }: any) => {
  const router = useRouter()
  const [, setPageNum] = useState(2)
  const [hasMore, setHasMore] = useState(true)
  const [posts, setPosts] = useState(data)
  const { user_id } = router.query
  const { limit } = PageConfig.base

  const getMoreArticle = (page = 2) => {
    setTimeout(async () => {
      const { rows: articles } = await fetchUserArticleList({ params: { page, limit, category_id, parent_id, user_id } })

      articles.length ? setPosts((post: any) => [...post, ...articles]) : setHasMore(false)
    }, 500)
  }

  useEffect(() => {
    getMoreArticle()
  }, [])

  if (!posts?.length) return null

  return (
    <>
      <InfiniteScroll
        dataLength={posts?.length}
        next={() => {
          setPageNum((old: number) => {
            const newPage = old + 1
            console.log('newPage', newPage)

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
