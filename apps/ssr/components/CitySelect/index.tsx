import React, { FC } from 'react'
import { Cascader } from 'antd'
import city from './data.js'

interface IProps {
  onChange?: any
}

export function getCurrentCity(data: any, current: any) {
  let ret: any = []
  data.map((c: any) => {
    if (c?.value === current) {
      ret = c.children
    }
  })

  return ret
}

const currentCityArr = '440000,440100,440101'.split(',')
const CitySelect: FC<IProps> = ({ onChange }) => {
  // const options = getCurrentCity(city, '440000')

  return (<Cascader placeholder="请选择城市" defaultValue={currentCityArr} options={city} onChange={onChange} />)
}

export default CitySelect
