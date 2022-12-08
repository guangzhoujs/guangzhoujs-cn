import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Layout from '@/layouts/home'
import AppConfig, { PageConfig } from '@/config'
import { fetchUserList } from '@/api/home'
import { LogoGithub, Email } from '@carbon/icons-react'
import { Pagination } from '@nextui-org/react'
import Bilibili from '@/icons/bilibili.svg'
import Weixin from '@/icons/weixin.svg'
import Gitee from '@/icons/gitee.svg'
import Zhihu from '@/icons/zhihu.svg'
import QQ from '@/icons/qq.svg'
import { Tooltip } from 'antd'
import Image from 'next/image'
import Router from 'next/router'

// 获取社会化信息
const getSNS = (user: any) => {
  return (
    <dl className="desc-info flex justify-between">
      {user.github && (
        <dd>
          <a href={user.github} target="_blank" rel="noreferrer"><LogoGithub size="22" /></a>
        </dd>
      )}
      {user.gitee && (
        <dd>
          <a href={user.gitee} target="_blank" rel="noreferrer"><Gitee /></a>
        </dd>
      )}
      {user.zhihu && (
        <dd>
          <a href={user.zhihu} target="_blank" rel="noreferrer"><Zhihu /></a>
        </dd>
      )}
      {user.bilibili && (
        <dd>
          <a href={user.bilibili} target="_blank" rel="noreferrer"><Bilibili /></a>
        </dd>
      )}
      {user.qq && (
        <dd>
          <a href={user.qq} target="_blank" rel="noreferrer"><QQ /></a>
        </dd>
      )}
      {user.email && (
        <dd>
          <a href={user.email} target="_blank" rel="noreferrer"><Email size="22" /></a>
        </dd>
      )}
      {user.weixin && (
        <dd>
          <a href={user.weixin} target="_blank" rel="noreferrer"><Weixin /></a>
        </dd>
      )}
    </dl>
  )
}

type PostPageProps = {
  users: any,
  total?: number
}

const Hero = ({ users, total }: PostPageProps) => {
  const { title, description } = AppConfig
  const [userList, setUserList] = useState(users)
  const pageRef = useRef<any>(1)
  const pageNum = total ? Math.round(total / PageConfig.base.limit) : 0

  useEffect(() => {
    if (users?.length) {
      setUserList(users)
    }
  }, [users])

  if (!users?.length) {
    return {
      notFound: true,
    }
  }

  // 分页处理
  const onPaginationChange = (page: number) => {
    pageRef.current = page
    Router.push({ pathname: '/hero', query: { page } })
  }

  return (
    <Layout>
      <Head>
        <title>首页 - {title}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="app-page-model app-hero-model container mx-auto my-6 white">
        <div className="app-hero-page">
          <ol className="user-list grid grid-cols-5 gap-4">
            {userList.length && userList.map((user: any) => {
              const src = 'http://milu.blog/public/home/images/aboutme/about-me.jpg'

              return (
                <li key={user.id} className="hero-list-item app-page-bg p-5">
                  <a href="http://jikey.cnblogs.com" target="_blank" className="userinfo-img" rel="noreferrer">
                    <Image
                      loader={() => src}
                      src={src}
                      alt="Picture of the author"
                      className="rounded-full"
                      width={100}
                      height={100}
                    />
                  </a>
                  <div className="user-title">
                    <h2>
                      <a href="http://jikey.cnblogs.com" target="_blank" className="text-2xl" rel="noreferrer">{user.nick_name}</a>
                    </h2>
                  </div>
                  <div className="useinfo-word border-b border-solid border-gray-300 mb-3 pb-1">
                    <p title={user.description} className="sub">
                      <Tooltip title={user.description} placement="top">
                        {user.description}
                      </Tooltip>
                    </p>
                  </div>
                  <div className="userinfo-content">
                    <div className="desc">
                      {getSNS(user)}
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
          <div className="app-page-footer flex justify-between mt-5">
            <div />
            <Pagination total={pageNum} onChange={onPaginationChange} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getServerSideProps({ query }: any) {
  const { page = 1 } = query
  const { rows: users, total } = await fetchUserList({ params: { page, limit: 2 } })

  return { props: { users, total } }
}

export default Hero
