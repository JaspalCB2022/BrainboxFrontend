import React,{useEffect} from 'react'
import { useGetOrgabizationMutation } from '../../../api/OrganizationApi'
import Cookies from 'js-cookie';

const PortalView = () => {

const [getOrganization]= useGetOrgabizationMutation();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authToken = urlParams.get('token');
        Cookies.set("token", authToken!, { expires: 1 / 24 });

        const host  = window.location.host
        const domain  = host.split(".")[0]
        console.log("Domain",domain);
        console.log("cokkies>>>",Cookies.get("authToken"))
        setTimeout(()=>{
            getOrganization(domain)
        },2000)
    }, [])
    




  return (
    <div>index</div>
  )
}

export default PortalView