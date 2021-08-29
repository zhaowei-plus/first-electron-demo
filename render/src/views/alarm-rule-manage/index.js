import React from 'react'
import { Route } from 'react-router'
import CacheRoute from 'react-router-cache-route'
import List from './list'
import Add from './add'
import Edit from './edit'

export default (params) => {
  const { match: { path } } = params
  return (
    <>
      <CacheRoute
        exact
        path={path}
        component={List}
      />
      <Route
        exact
        path={`${path}/add`}
        component={Add}
      />
      <Route
        exact
        path={`${path}/edit/:id`}
        component={Edit}
      />
    </>
  )
}
