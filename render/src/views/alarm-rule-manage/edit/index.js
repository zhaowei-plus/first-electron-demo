import React from 'react'
import { BreadCrumb, Layout } from '@/components'

const { Content } = Layout

const Edit = () => (
  <Layout>
    <BreadCrumb
      routes={[{ title: '告警规则管理', to: '/alarm-rule-manage' }, '编辑告警']}
    />
    <Content>
      编辑告警规则
    </Content>
  </Layout>
)

export default Edit
