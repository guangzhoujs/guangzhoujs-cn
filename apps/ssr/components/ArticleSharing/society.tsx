import { WeiboOutlined, LinkOutlined } from '@ant-design/icons'
import QRCode from 'qrcode.react'
import QQ from '@/icons/qq-gray.svg'
import Weixin from '@/icons/weixin-gray.svg'
import { message } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { shareTo } from '@/utils'

const Society = () => {
  const currentUrl = window.location.href
  const onShare = (type: string) => {
    const options = {
      type,
      url: currentUrl,
      title: document.title,
      pics: '',
      summary: '摘要',
      desc: '描述',
      appkey: 'abcdef',
    }
    shareTo(options)
  }

  return (
    <div className="action-share-popup">
      <ul className="action-share-list">
        <li className="share-item wechat">
          <Weixin />
          <span className="share-item-title">微信</span>
          <div className="wechat-qrcode animate__animated animate__bounceIn">
            <div className="wechat-qrcode-img">
              <QRCode value={currentUrl} size={140} fgColor="#000000" />
            </div>
            <span className="wechat-qrcode-title">微信扫一扫</span>
          </div>
        </li>
        <li className="share-item qq" onClick={() => onShare('qq')}>
          <QQ />
          <span className="share-item-title">QQ</span>
        </li>
        <li className="share-item weibo" onClick={() => onShare('weibo')}>
          <WeiboOutlined />
          <span className="share-item-title">新浪微博</span>
        </li>
        <CopyToClipboard
          text={currentUrl}
          onCopy={() => {
            message.success('复制成功！')
          }}
        >
          <li className="share-item link" title="复制文章链接">
            <LinkOutlined />
            <span className="share-item-title">文章链接</span>
          </li>
        </CopyToClipboard>
      </ul>
    </div>
  )
}

export default Society
