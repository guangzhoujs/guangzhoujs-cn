import React, { FC } from 'react'
import { Select } from 'antd'
import { useArticleCategory } from '@/hooks/common'

const { Option } = Select

interface IProps {
  onChange?: any
  defaultValue?: string
  config?: any
}

const CategorySelect: FC<IProps> = ({ onChange, defaultValue, config }) => {
  const { categoryList } = useArticleCategory()
  const style = config?.style

  return (
    <Select placeholder="请选择分类" onChange={onChange} key={defaultValue} defaultValue={defaultValue} style={style}>
      {categoryList?.length > 0 && categoryList.map(({ id, title }: any) => {
        return (<Option key={id} value={id}>{title}</Option>)
      })}
      { !config?.isHiddenJob && <Option value={2}>招聘</Option> }
    </Select>
  )
}

export default CategorySelect
