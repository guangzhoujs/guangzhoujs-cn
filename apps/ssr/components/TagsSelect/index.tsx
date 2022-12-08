import React, { FC } from 'react'
import { Select } from 'antd'
import { useTags } from '@/hooks/common'

const { Option } = Select

interface IProps {
  onChange?: any
  width?: number | string
  defaultValue?: string
  config?: any
}

const TagsSelect: FC<IProps> = ({ onChange, width, defaultValue, config }) => {
  const { tagsList } = useTags()
  const innerWidth = width || 120
  const style = config?.style || { width: innerWidth }

  return (
    <Select placeholder="请选择分类" labelInValue onChange={onChange} key={defaultValue} mode="multiple" defaultValue={defaultValue} style={style}>
      {tagsList?.length > 0 && tagsList.map(({ id, tag_name }: any) => {
        return (<Option key={id} value={id}>{tag_name}</Option>)
      })}
    </Select>
  )
}

export default TagsSelect
