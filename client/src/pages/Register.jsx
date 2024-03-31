import Swal from 'sweetalert2'
import { useState } from "react"
import instance from '../config'
import { useNavigate } from 'react-router-dom'

export default function Register(){
    const navigate = useNavigate()
    const [input,setInput] = useState({
        username:'',email:'',password:'',imageUrl:''
    })

    async function handlerRegister(e){
        e.preventDefault()
        try {
            await instance({method:'post', url:'/register', data:input})
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Success Register!",
                showConfirmButton: false,
                timer: 1500
              });
            navigate('/login')
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
              });
            console.log(error,'<-error register');
        }
    }
    return(
        <>
    <form style={{width:'30vw', margin:'auto', marginTop:'150px'}} onSubmit={handlerRegister}>
        <center>
            <h3>Sigh In</h3>
        </center>
        <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" id="username" onChange={(e)=>setInput({...input,username:e.target.value})}/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={(e)=>setInput({...input,email:e.target.value})}/>
        </div>
        <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">ImageUrl</label>
            <input type="text" className="form-control" id="imageUrl" onChange={(e)=>setInput({...input,imageUrl:e.target.value})}/>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" onChange={(e)=>setInput({...input,password:e.target.value})}/>
        </div>
        <div>
            <button type="submit" className="btn btn-primary">Sign In</button>
        </div>
        <div style={{display:'flex', justifyContent:'center', marginTop:'20px'}}>
            <div id="buttonDiv"></div>
        </div>
    </form>
        </>
    )
}