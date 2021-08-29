import React, { useMemo, useState, useEffect } from 'react'
import { Button } from 'antd'
import { SchemaForm, createAsyncFormActions } from '@formily/antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'
import { formatFormSchema, clearObject } from '@/utils'
import cs from 'classnames'

import './index.less'

const ROW_HEIGHT = 42 // 单行42像素

export default props => {
  const {
    schema,
    onSearch,
    components,
    defaultValue = {},
    ...rest
  } = props

  const [expand, setExpand] = useState(true)
  const [enableExpand, setEnableExpand] = useState(true)
  const actions = useMemo(() => createAsyncFormActions(), [])

  const onSubmit = (params = {}) => {
    onSearch(clearObject(params))
  }

  const onReset = (params = {}) => {
    onSearch(clearObject({ ...defaultValue, ...params}))
  }

  const onCalcEnableExpand = () => {
    // 根据高度检测是否显示展开蓝
    const { height } = document.querySelector('.search-form').getBoundingClientRect()
    setEnableExpand(height / ROW_HEIGHT > 1)
  }

  useEffect(() => {
    window.addEventListener('resize', onCalcEnableExpand)
    return () => {
      window.removeEventListener('resize', onCalcEnableExpand)
    }
  }, [])

  return (
    <div className="search">
      <div className={cs('search__input', { 'expand': expand })}>
        <SchemaForm
          actions={actions}
          onReset={onReset}
          onSubmit={onSubmit}
          className="search-form"
          components={components}
          defaultValue={defaultValue}
          schema={{
            type: 'object',
            properties: formatFormSchema(schema),
          }}
          {...rest}
        />
      </div>
      <div className="search__operation">
        <div
          onClick={() => setExpand(!expand)}
          className={cs('input-expand', { 'hidden': !enableExpand })}
        >
          {
            expand ? (
              <>
                <span style={{ marginRight: 4 }}>收起</span>
                <UpOutlined />
              </>
            ) : (
              <>
                <span style={{ marginRight: 4 }}>展开</span>
                <DownOutlined />
              </>
            )
          }
        </div>
        <div className="button-group">
          <Button
            type="primary"
            onClick={() => actions.submit()}
          >
            查询
          </Button>
          <Button onClick={() => actions.reset()}>重置</Button>
        </div>
      </div>
    </div>
  )
}
