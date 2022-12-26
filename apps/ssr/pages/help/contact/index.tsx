/* eslint-disable @next/next/no-img-element */
import Head from 'next/head'
import Layout from '@/layouts/home'
import Logo from '@/public/images/logo.png'
import QQ from '@/public/images/qq.jpg'
import AppConfig from '@/config'
import { Divider } from 'antd'
import Image from 'next/image'
import { IsBrowser } from '@/components/IsBrowser'
import Link from 'next/link'

const Contact = () => {
  const { title, description } = AppConfig

  return (
    <Layout>
      <Head>
        <title>{`首页 - ${title}`}</title>
        <meta name="description" content={description} />
      </Head>
      <div className="app-page-model container mx-auto my-6 p-6 app-page-bg">
        <div className="app-about-title text-xl mb-4 text-center">
          <h1>联系我们</h1>
        </div>
        <Divider />
        <div className="app-about-body flex content-center justify-center">
          <div className="img mr-5">
            <Image alt="广州前端Q群：175869166" src={Logo} width={200} height={150} />
          </div>
          <div className="main">
            <div className="app-main-title text-xl mb-4">
              <h1>Hi，通过以下方式找到我们：</h1>
            </div>
            <div className="app-about-content text-base">
              <p>广州前端求职内推Q群：175869166</p>
              <p>微信群满200人，加Q群后邀请加入。</p>
              <p>
                <a target="_blank" href="https://qm.qq.com/cgi-bin/qm/qr?k=fSwcq7J06jwJtZ0IF2caJO3Unp990kpi&jump_from=webapi&authKey=NA1P3OG9kSmqnER4lf9Z7Ln3o2D5H+3nCDsDlKbE+ePHwpn5in6H7obWnDA7bYIK" rel="noreferrer">
                  <img src="//pub.idqqimg.com/wpa/images/group.png" alt="广州前端求职内推群" title="广州前端求职内推群" />
                </a>
              </p>
              <IsBrowser>
                <Image src={QQ} alt="Q群" width={170} height={250} />
              </IsBrowser>
              <Divider />
              <p>
                <Link href="https://github.com/guangzhoujs/" className="text-blue-500" target="_blank" rel="noreferrer">
                  https://github.com/guangzhoujs/
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Contact
