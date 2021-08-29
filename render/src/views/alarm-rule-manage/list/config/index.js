import React from 'react'
import { Switch, Space, Button } from 'antd'
import { STATUS } from '../constant'

export const getSchema = () => ({
  name: {
    type: 'string',
    title: '告警规则名称',
    'x-props': {
      placeholder: '请输入',
    },
  },
  status: {
    type: 'string',
    title: '状态',
    enum: STATUS,
    'x-props': {
      placeholder: '全部',
    },
  },
})

export const getColumns = (actions) => {
  const {
    handleEdit,
    handleDelete,
    handleChangeStatus,
  } = actions

  return [
    {
      title: '编号',
      dataIndex: 'number',
    },
    {
      title: '告警规则名称',
      dataIndex: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '触发历史',
      dataIndex: 'triggerHistory',
    },
    {
      title: '启用状态',
      dataIndex: 'status',
      render: (text, record) => (
        <Switch
          checkedChildren="启用"
          unCheckedChildren=""
          checked={text}
          onChange={(checked) => handleChangeStatus(record, checked)}
        />
      ),
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (text, record) => {
        return (
          <Space>
            <Button
              onClick={() => handleEdit(record)}
            >
              编辑
            </Button>
            <Button
              danger
              onClick={() => handleDelete(record)}
            >
              删除
            </Button>
          </Space>
        )
      },
    },
  ]
}
