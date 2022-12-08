import React, { Fragment } from 'react'
import * as Icons from '@ant-design/icons'
import { isValidKey } from '@/utils'

type IProps = {
  [type: string]: string
}

export default function Icon(props: IProps) {
  const { type } = props
  let dynamicIcon

  if (isValidKey(type, Icons)) {
    dynamicIcon = React.createElement(
      Icons[type] as string,
      props,
    )
  }

  return (
    <>{dynamicIcon}</>
  )
}
