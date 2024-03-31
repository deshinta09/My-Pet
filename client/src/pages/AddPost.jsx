import { useState } from "react";
import Swal from 'sweetalert2'
import { useNavigate, useParams } from "react-router-dom";
import instance from "../config";

export default function AddPost(){
    const navigate = useNavigate()
    const {id} = useParams()
    const [input,setInput] = useState({
        title:'',message:'',imageUrl:''
    })

    async function handlerAdd(e){
        e.preventDefault()
        try {
            await instance({method:'post', url:`/posts/${id}`, data:input,
                headers:{
                    Authorization:`Bearer ${localStorage.access_token}`
                }
            })
            navigate('/communities/'+id)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Success Add Post!",
                showConfirmButton: false,
                timer: 1500
              });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
              });
            console.log(error,'<-error add post');
        }
    }

    return(
        <>
    <form style={{width:'30vw', margin:'auto', marginTop:'150px'}} onSubmit={handlerAdd}>
        <center>
            <h3>Add Post</h3>
        </center>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" className="form-control" id="title" onChange={(e)=>setInput({...input,title:e.target.value})}/>
        </div>
        <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">ImageUrl</label>
            <input type="text" className="form-control" id="imageUrl" onChange={(e)=>setInput({...input,imageUrl:e.target.value})}/>
        </div>
        <div className="mb-3">
            <label htmlFor="message" className="form-label">Message</label>
            <input type="text" className="form-control" id="message" onChange={(e)=>setInput({...input,message:e.target.value})}/>
        </div>
        <div>
            <button type="submit" className="btn btn-primary">Post</button>
        </div>
    </form>
        </>
    )
}