import React from 'react'
import { BreadCrumb, Layout } from '@/components'

const { Content } = Layout

const Process = () => {
  return (
    <Layout>
      <BreadCrumb
        routes={[{ title: '告警记录管理', to: '/alarm-record-manage' }, '处理']}
      />
      <Content>
        处理
      </Content>
    </Layout>
  )
}

export default Process
