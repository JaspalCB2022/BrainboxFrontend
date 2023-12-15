
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "./App.css";
import { Profiler, useEffect } from "react";
import route from "./router/router";
import { renderRoutes } from "./router";
import { Toaster } from 'react-hot-toast';
import { useLocation } from "react-router-dom";
import React from "react";


function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function App() {

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

  return (
    <Profiler  id="chatbot" onRender={(id, phase, actualDuration)=>{ }}>
      <div style={{ display: "flex", height: '100%' }}>
        <Toaster toastOptions={{
          className: '',
          style: toastStyle,
        }}
        />
        {renderRoutes(route)}
      </div>
    </Profiler>
  );
}

export default App;
