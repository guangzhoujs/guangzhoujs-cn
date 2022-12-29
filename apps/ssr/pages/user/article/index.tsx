import { useRootStore } from '@/providers/RootStoreProvider'
import Head from 'next/head'
import UserLayout from '@/layouts/user'
import AppConfig, { PageConfig } from '@/config'
import { fetchUserArticleList } from '@/api/home'
import Content from '../_common/post-content'
import { setServiceToken } from '@/utils/request'
import { useEffect } from 'react'
import Router from 'next/router'

type PostPageProps = {
  articles: any
  code: number
}

const parent_id = 1
const category_id = '0'
const Article = ({ articles, code }: PostPageProps) => {
  const { appStore } = useRootStore()
  const { title, description } = AppConfig

  useEffect(() => {
    if (code === 20002) {
      appStore.logout()

      setTimeout(() => {
        Router.push({ pathname: '/' })
      }, 3000)
    }
  }, [code])
  return (
    <UserLayout>
      <Head>
        <title>{`首页 - ${title}`}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="app-user-page-model app-page-bg">
        <Content data={articles} category_id={category_id} parent_id={parent_id} />
      </div>
    </UserLayout>
  )
}

export async function getServerSideProps({ req }: any) {
  // 保存token到客户端header
  setServiceToken(req)
  try {
    const { rows: articles } = await fetchUserArticleList({ params: { ...PageConfig.base, parent_id, category_id } })
    return { props: { articles } }
  } catch (err: any) {
    if (err.response) {
      return { props: err.response.data }
    }
  }
}

export default Article
