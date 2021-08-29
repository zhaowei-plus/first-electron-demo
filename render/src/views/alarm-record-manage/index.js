import React from 'react'
import { Route } from 'react-router'
import CacheRoute from 'react-router-cache-route'
import List from './list'
import Process from './process'

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
        path={`${path}/process/:id`}
        component={Process}
      />
    </>
  )
}
