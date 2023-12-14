// types.ts

import {LazyExoticComponent, ComponentType } from 'react';

export interface RouteItem {
  name: string;
  title?: string;
  path?: string;
  component?: LazyExoticComponent<ComponentType<any>>;
  routes?: RouteItem[];
  layout?: ComponentType<any>;
}

export interface LayoutItem {
  layout: ComponentType<any>;
  routes: RouteItem[];
}

export interface FlattenedRouteItem {
  component?: LazyExoticComponent<ComponentType<any>>;
  path: string;
  name: string;
}

export interface RenderRoutesProps {
  mainRoutes: LayoutItem[];
}

export interface SubRouteItem {
    name: string;
    path?: string;
    component?: LazyExoticComponent<ComponentType<any>>;

}
