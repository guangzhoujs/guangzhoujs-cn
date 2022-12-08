import React, { FC } from 'react'
import { Select } from 'antd'
import { useArticleCategory } from '@/hooks/common'

const { Option } = Select

interface IProps {
  onChange?: any
  width?: number | string
  defaultValue?: string
  config?: any
}

const CategorySelect: FC<IProps> = ({ onChange, width, defaultValue, config }) => {
  const { categoryList } = useArticleCategory()
  const innerWidth = width || 120
  const style = config?.style || { width: innerWidth }

  return (
    <Select placeholder="请选择分类" onChange={onChange} key={defaultValue} defaultValue={defaultValue} style={style}>
      {categoryList?.length > 0 && categoryList.map(({ id, title }: any) => {
        return (<Option key={id} value={id}>{title}</Option>)
      })}
    </Select>
  )
}

export default CategorySelect
