import React, { FC } from 'react'
import { message, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface Iprops {
  title?: string
  accept?: string
  config?: object
  onSuccess?: any,
  onFail?: any,
}

const AppUpload: FC<Iprops> = ({ title = '上传', accept = '.jpg, .jpeg, .png', config, onSuccess, onFail }) => {
  const photoProps = {
    name: 'file',
    // headers: {
    //   authorization: 'authorization-text',
    // },
    accept,
    onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        if (info.file?.response?.code === 1) {
          message.error(info.file.response.msg)
          return
        }

        const urls = info.fileList.length > 0 && info.fileList.map((item: any) => item?.response?.data)

        message.success(`${info.file.name} 上传成功`)
        onSuccess && onSuccess({ url: info.file.response.data, fileList: info.fileList, urls, response: info.file.response })
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`)
        onFail && onFail()
      }
    },
  }
  Object.assign(photoProps, config)
  console.log('title', title)

  return (
    <Upload {...photoProps}>
      <div className="app-upload-wrap flex justify-center items-center">
        <PlusOutlined />
      </div>
    </Upload>
  )
}

export default AppUpload
