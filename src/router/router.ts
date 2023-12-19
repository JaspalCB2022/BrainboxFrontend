import { lazy } from "react";
import BlankLayout from "../_organism/layouts/BlankLayout";
import PublicLayout from "../_organism/layouts/PublicLayout";
import WithSidebarLayout from "../_organism/layouts/WithSidebarLayout";
import { LayoutItem } from './types';
const routes:LayoutItem[]= [
  {
    layout: PublicLayout,
    routes: [
      {
        name: "login",
        title: "Login",
        path: "/",
        component: lazy(() => import("../_organism/LoginPage")),
      },
      // {
      //   name: "login",
      //   title: "Login",
      //   path: "/",
      //   // component: lazy(() => import("../_organism/WalkThroughPage")),
      // },
      // {
      //   name: "login",
      //   title: "Login",
      //   path: "/login",
      //   component: lazy(() => import("../_organism/Components/Auth/Login")),
      // },
    ]
  },
  {
    layout: WithSidebarLayout,
    routes: [
      {
        layout: BlankLayout,
        name: "pr-status-check",
        routes: [
          // {
          //   name: "commodity-code",
          //   title: "Commodity Code",
          //   path: "/pr-status-check/commodity-code",
          //   // component: lazy(() => import("../_organism/Components/PrStatusCheck/CommodityCode")),
          // },
          // {
          //   name: "commodity-code",
          //   title: "Commodity Code",
          //   path: "/",
          //   // component: lazy(() => import("../_organism/Components/PrStatusCheck/CommodityCode")),
          // },
          // {
          //   name: "company-code",
          //   title: "Company Code",
          //   path: "/pr-status-check/company-code",
          //   // component: lazy(() => import("../_organism/Components/PrStatusCheck/CompanyCode")),
          // },
          // {
          //   name: "currency-code",
          //   title: "Currency Code",
          //   path: "/pr-status-check/currency-code",
          //   // component: lazy(() => import("../_organism/Components/PrStatusCheck/CurrencyCode")),
          // },
          // {
          //   name: "plants",
          //   title: "Plants",
          //   path: "/pr-status-check/plants",
          //   // component: lazy(() => import("../_organism/Components/PrStatusCheck/Plant")),
          // },
          // {
          //   name: "uom",
          //   title: "Uom",
          //   path: "/pr-status-check/uom",
          //   // component: lazy(() => import("../_organism/Components/PrStatusCheck/Uom")),
          // },
          // {
          //   name: "po",
          //   title: "PO",
          //   path: "/pr-status-check/po",
          //   // component: lazy(() => import("../_organism/Components/PrStatusCheck/PO")),
          // },
          // {
          //   name: "suppliers",
          //   title: "Suppliers",
          //   path: "/pr-status-check/suppliers",
          //   // component: lazy(() => import("../_organism/Components/PrStatusCheck/Supplier")),
          // },
          // {
          //   name: "acess-control",
          //   title: "AcessControl",
          //   path: "/pr-status-check/access-control",
          //   // component: lazy(() => import("../_organism/Components/PrStatusCheck/AcessControl")),
          // },
          {
            name: "customers",
            title: "Customers",
            path: "/customers",
            component: lazy(() => import("../_organism/Pages/Customers")),
          },
          // {
          //   name: "country",
          //   title: "Country",
          //   path: "/pr-status-check/country",
          //   // component: lazy(() => import("../_organism/Components/PrStatusCheck/Country")),
          // },
        ]
      },
    ],
  },

];

export default routes;
