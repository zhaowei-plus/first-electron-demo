import React from 'react'
import { BreadCrumb, Layout } from '@/components'

const { Content } = Layout

const List = () => {
  return (
    <Layout>
      <BreadCrumb
        routes={['告警记录管理']}
      />
      <Content>
        告警记录列表
      </Content>
    </Layout>
  )
}

export default List
