import React, { useMemo } from 'react'
import Head from 'next/head'
import Layout from '@/layouts/home'
import AppConfig from '@/config'
import { fetchArticleDetail, fetchArticleHot, fetchCommentList, fetchTagsList } from '@/api/home'
import { Chat, ThumbsUp, View, TextCreation } from '@carbon/icons-react'
import { CommentContext } from '@/pages/_common/comment-context'
import Sidebar from '@/pages/article/_sidebar'
import Image from 'next/image'
import Comment from '@/bc/Comment'
import { handleTree } from '@/utils'

type PostPageProps = {
  hc: any
  commentData: any
  hots: any
  tags: any
}

const JobDetail = ({ hc, commentData, hots, tags }: PostPageProps) => {
  const { title, description } = AppConfig
  const { commentList } = commentData
  const src = 'https://pica.zhimg.com/691df473a_is.jpg?source=32738c0c'

  const CommentProviderData = useMemo(
    () => ({ commentData }),
    [commentData],
  )

  return (
    <Layout>
      <Head>
        <title>{hc.title} - {title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="app-id-container app-job-model flex container mx-auto mt-6">
        <div className="app-main flex-1">
          <div className="article-item app-page-bg relative white mb-6">
            <div className="app-job-title mb-6">
              <h1>{hc.title}</h1>
            </div>
            <div className="app-detail-overview flex justify-between items-center mt-2">
              <div className="info flex">
                <div className="avatar mr-2">
                  <Image
                    loader={() => src}
                    src={src}
                    alt="Picture of the author"
                    className="rounded-full"
                    width={50}
                    height={50}
                  />
                </div>
                <div className="statis">
                  <div className="author">{hc.author}</div>
                  <div className="assist flex">
                    <div className="comment" hidden><Chat />{hc.comment_count} 评论</div>
                    <i hidden>/</i>
                    <div className="like"><ThumbsUp /><b>{hc.likes}</b> 点赞</div>
                    <i>/</i>
                    <div className="views"><View /><b>{hc.views}</b> 阅读</div>
                    <i>/</i>
                    <div className="words"><TextCreation />{hc.content.length} 字</div>
                  </div>
                </div>
              </div>
              <div className="date">
                <b>{hc.create_time?.slice(8, 10)}</b>
                <i>{hc.create_time?.slice(0, 7)}</i>
              </div>
            </div>
            <div className="bytemd-preview">
              <div className="article-body markdown-body" dangerouslySetInnerHTML={{ __html: hc.content }} />
            </div>
          </div>
          <div id="app-comment" className="app-job-comment app-page-bg mb-6" hidden>
            <CommentContext.Provider value={CommentProviderData}>
              <Comment PropData={commentList} />
            </CommentContext.Provider>
          </div>
        </div>
        <Sidebar tags={tags} hots={hots} />
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ params }: any) {
  const { id } = params
  const { rows: hc } = await fetchArticleDetail({ id })
  const { rows: comments } = await fetchCommentList({ id })
  const { rows: hots } = await fetchArticleHot()
  const { rows: tags } = await fetchTagsList()

  return {
    props: {
      hc,
      hots,
      tags,
      commentData: {
        articleId: id,
        commentList: handleTree(comments),
      },
    },
  }
}

export default JobDetail
