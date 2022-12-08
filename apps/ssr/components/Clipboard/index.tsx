import React from 'react'
import { Tooltip, message } from 'antd'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { CopyOutlined } from '@ant-design/icons'

interface IProps {
  text: string
  children?: React.ReactNode
}

/**
 * 复制到剪切板
 */
export default (props: IProps) => {
  const { text, children } = props
  return (
    <Tooltip title="点击复制">
      <CopyToClipboard
        text={text}
        onCopy={() => {
          message.success('复制成功！')
        }}
      >
        <span style={{ cursor: 'pointer' }}>{ children || <CopyOutlined />}</span>
      </CopyToClipboard>
    </Tooltip>
  )
}
