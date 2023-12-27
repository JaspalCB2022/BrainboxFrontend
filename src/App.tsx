
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./App.css";
import { Profiler, useEffect } from "react";
import {routes ,customerRoutes} from "./router/router";
import { renderRoutes } from "./router";
import { Toaster } from 'react-hot-toast';
import { useLocation } from "react-router-dom";
import React from "react";


function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function App() {
let updatedRoute
  let toastStyle = {
    minWidth: 'max-content',
  }

  let query = useQuery();

  useEffect(()=>{
    let tenantId = query.get('tenantId')
    let userName = query.get('username')
    // localStorage.setItem('tenantId', tenantId)
    localStorage.setItem('tenantId', 'cae0fcf3-0c30-4b82-9b0c-a77856203f46')
    // localStorage.setItem('userName', userName)

  })
  
// console.log("window.location.host.split",window.location.host.split(".")[0]);

// const isCustomer = JSON.parse(localStorage.getItem("slug")!)       
// console.log(isCustomer);

// const isSlug = isCustomer.find((cus:any)=> cus.slug === window.location.host.split(".")[0])

// window.location.host.split(".")[0]

// const isTrue = JSON.parse(localStorage.getItem("slug")!)?.find((cus:any)=> cus.slug === window.location.host.split(".")[0])
// console.log("isTrue",isTrue);


  // if (JSON.parse(localStorage.getItem("slug")!)?.find((cus:any)=> cus.slug === window.location.host.split(".")[0]) ||  localStorage.getItem("slug") === window.location.host.split(".")[0] ) {
  //   updatedRoute = customerRoutes 
  // }else{
  //   updatedRoute = routes
  //   console.log("updatedRoutes>>>>>",updatedRoute);
  // }


  if ( window.location.host.split(".")[0] === "addidas-shoes" ) {
    updatedRoute = customerRoutes 
  }else{
    updatedRoute = routes
    console.log("updatedRoutes>>>>>",updatedRoute);
  }


  


  return (
    <Profiler  id="chatbot" onRender={(id, phase, actualDuration)=>{ }}>
      <div style={{ display: "flex", height: '100%' }}>
        <Toaster toastOptions={{
          className: '',
          style: toastStyle,
        }}
        />
        {renderRoutes(updatedRoute!)}
      </div>
    </Profiler>
  );
}

export default App;
