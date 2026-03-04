import {Outlet, Navigate} from "react-router-dom"

export default  function ProtectedRoute (){
    const isLoggedin = localStorage.getItem("token");
    
    if(!isLoggedin){
        return <Navigate to="/" replace/>
    }
    return (
        <>
        <Outlet replace/> 
        </>
    )
}

