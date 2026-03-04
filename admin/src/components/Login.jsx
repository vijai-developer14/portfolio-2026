import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


export default function Login (){
    const [isdenied, SetIsdenied] = useState(false);
    const [getuserName, SetGetuserName] = useState("");
    const [getpass, SetGetpass] = useState("");
    const navigate = useNavigate();
    
    
    const handleLogin = (e)=>{
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API_URL}/login-portfolio`,{getuserName, getpass})
        .then((response)=>{
            console.log(response)
            if(response.data.message === "success"){
                localStorage.setItem("token", response.data.token)
                navigate("/admin", { replace: true, state:{from:"login"} });
                
                
            }
            else if(response.data.message === "denied"){
                navigate("/", { replace: true });
                SetIsdenied(true)
            }
        })
        .catch((err)=>console.error(err))
    }
    return(
        <>
        <section className="login_bg">
            <div>
                <p>Login</p>
                <form action="" className="login_form" onSubmit={handleLogin}>
                    <input type="text" placeholder="Username" onChange={((e)=>SetGetuserName(e.target.value))}/>
                    <input type="text" placeholder="Password" onChange={((e)=>SetGetpass(e.target.value))}/>
                    <input type="submit" value="Submit"/>
                </form>
                {isdenied &&
                    <p>Username or Password is Incorrect</p>}
            </div>
        </section>
        </>
    )
}  

// vijai-port-2003
// legacy030314XD