import flattenDeep from 'lodash/flattenDeep';
import React from 'react';
import { Route, Routes as ReactRoutes } from 'react-router-dom';
import { RouteItem, LayoutItem,SubRouteItem } from './types';

const generateFlattenRoutes = (routes : RouteItem[] | undefined) : RouteItem[] | [] => {
  if (!routes) return [];
  return flattenDeep(routes.map(({ routes: subRoutes, ...rest }:RouteItem) => [rest, generateFlattenRoutes(subRoutes)]));
}

export const renderRoutes = (mainRoutes:LayoutItem[]) => {
    const layouts = mainRoutes.map(({ layout: Layout, routes }, index) => {
      
      const subRoutes = generateFlattenRoutes(routes);
      return (
        <Route key={index} element={<Layout />}>
            {subRoutes.map(({ component: Component, path, name }:SubRouteItem) => {
              return (
                Component && path && (<Route key={name} element={<Component />} path={path} />)
              )
            })}
        </Route>
      )
    });
    return <ReactRoutes>{layouts}</ReactRoutes>;
}