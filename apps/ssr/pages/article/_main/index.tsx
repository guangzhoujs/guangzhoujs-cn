import React, { useEffect, useState } from 'react'
import { Empty, Spin } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import InfiniteScroll from 'react-infinite-scroll-component'
import { fetchArticleList } from '@/api/home'
import { PageConfig } from '@/config'
import { isUndefined } from 'lodash'
import Item from './_item'

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />

type PostPageProps = {
  data: any,
  category_id?: string
  parent_id?: number
}

const Main = ({ data, category_id, parent_id }: PostPageProps) => {
  const [, setPageNum] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [posts, setPosts] = useState(data)
  const { limit } = PageConfig.base

  const getMoreArticle = (page = 1) => {
    setTimeout(async () => {
      const aparams = { page, limit, parent_id }
      Object.assign(aparams, { category_id })

      const { rows: articles } = await fetchArticleList({ params: aparams })
      articles.length ? setPosts((post: any) => [...post, ...articles]) : setHasMore(false)
    }, 500)
  }

  useEffect(() => {
    if (category_id) {
      setPosts(() => [])
      setPageNum(1)
      setHasMore(true)
    }
    getMoreArticle()
  }, [category_id])

  if (isUndefined(posts?.length)) return null

  return (
    <div className="app-article-main flex-1 app-page-bg">
      <div className="app-article-content">
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
            <div className="text-center py-5">
              <Spin indicator={antIcon} />
            </div>
        )}
          endMessage={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        >
          {posts.length > 0 && posts.map((r: any) => {
            return (
              <Item key={r?.id} data={r} />
            )
          })}
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default Main
