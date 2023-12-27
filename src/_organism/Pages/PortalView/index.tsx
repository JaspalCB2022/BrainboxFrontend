import React,{useEffect} from 'react'
import { useGetOrgabizationMutation } from '../../../api/OrganizationApi'
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import loginApi from '../../../api/loginApi';
import customerApi from '../../../api/CustomersApi';
const PortalView = () => {


const [getOrganization]= useGetOrgabizationMutation();
// const loginData = useSelector((state:any) => state[loginApi.reducerPath].mutations);
// const customerdata = useSelector((state:any) => state[customerApi.reducerPath]);
// console.log("loginData>>>",loginData);
// console.log("customerdata>>>",customerdata);


    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const authToken = urlParams.get('token');
        console.log("auth",authToken);
        
        Cookies.set("jwt", authToken!, { expires: 1 / 24 });

        const host  = window.location.host
        const domain  = host.split(".")[0]
        console.log("Domain",domain);
        localStorage.setItem("slug",domain)
        console.log("cokkies>>>",Cookies.get("jwt"))
        


        setTimeout(()=>{
            getOrganization(domain)
        },2000)
    }, [])

    // useEffect(() => {
    //   // Extract token from URL parameters
    //   const urlParams = new URLSearchParams(window.location.search);
    //   const authToken = urlParams.get('token');
    //   console.log("auth", authToken);
  
    //   // Set the JWT cookie
    //   if (authToken) {
    //     Cookies.set("jwt", authToken, { expires: 1 / 24 }); // Assuming authToken is a valid token
    //   }
    //   // Retrieve the JWT cookie and log it
    //   const jwtCookie = Cookies.get("jwt");
    //   console.log("cokkies>>>", jwtCookie);
    
    //   // Extract and log the domain from the host
    //   const host = window.location.host;
    //   const domain = host.split(".")[0];
    //   console.log("Domain", domain);

    //   setTimeout(()=>{
    //     getOrganization(domain)
    // },2000)
    // }, []);



    // useEffect(() => {
    //   window.addEventListener('message', (event:any) => {
    //     // Check if the message is from the expected origin
    //     if (event.origin === 'http://addidas-shoes.localhost:3002') {
    //       // Check the message type
    //       console.log("insideLogin>>");
    //       console.log("event.data.type>>",event.data);
    //       console.log("event.data.type>>",event);

          
    //       if (event.data.type === 'authToken') {
    //       console.log("insidetypeLogin>>");

    //         const receivedToken = event.data.token;
      
    //         // Now you can use the received token for your API call or any other purpose
    //         // Make sure to handle this securely and appropriately
    //         console.log('Received Token:', receivedToken);
    //       }
    //     }
    //   });
      
    // }, [])
    
    




  return (
    <div>index</div>
  )
}

export default PortalView