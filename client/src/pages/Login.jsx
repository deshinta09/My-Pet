import { useEffect, useState } from "react"
import instance from "../config"
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate()
    const [input,setInput] = useState({
        email:'', password:''
    })

    async function handlerLogin(e){
        e.preventDefault()
        try {
            let {data} = await instance({method:'post', url:'/login', data:input})
            localStorage.setItem('access_token',data.access_token)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Success Login!",
                showConfirmButton: false,
                timer: 1500
              });
            navigate('/')
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
              });
            console.log(error,'<-error login');
        }
    }

    async function handleCredentialResponse({credential}) {
        try {
            let {data} = await instance({method:'post', url:'/google-login',   headers:{
                ['google-token'] : credential
            }
            })
            localStorage.setItem('access_token', data.access_token)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Success login!",
                showConfirmButton: false,
                timer: 1500
            });
            navigate('/')
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
              });
            console.log(error,'<-error login google');
        }
    }

    function keRegister(e){
        e.preventDefault()
        navigate('/register')
    }

    useEffect(()=>{
        window.onload = function () {
            google.accounts.id.initialize({
              client_id: '204929923230-n4kf155sjaf2cn60o47o7s1nqrq4qvpg.apps.googleusercontent.com',
              callback: handleCredentialResponse
            });
            google.accounts.id.renderButton(
              document.getElementById("buttonDiv"),
              { theme: "outline", size: "large" }  // customization attributes
            );
          }
    }, [])

    return(
        <>
    <form style={{width:'30vw', margin:'auto', marginTop:'150px'}} onSubmit={handlerLogin}>
        <center>
            <h3>Login</h3>
        </center>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={(e)=>setInput({...input,email:e.target.value})}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" onChange={(e)=>setInput({...input,password:e.target.value})}/>
        </div>
        <div>
            <button type="submit" className="btn btn-primary">Login</button>
            <br />
            <h6>Don't have an account ? <a href="" onClick={keRegister}>Sign In</a></h6>
        </div>
        <div style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>
            <div id="buttonDiv"></div>
        </div>
    </form>
        </>
    )
}