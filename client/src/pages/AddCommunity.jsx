import Swal from 'sweetalert2'
import { useState } from "react"
import instance from '../config';
import { useNavigate } from 'react-router-dom';

export default function AddCommunity(){
    const navigate = useNavigate()
    const [input,setInput] = useState({
        name:'', imageUrl:'', description:''
    })

    async function handlerAdd(e){
        e.preventDefault()
        try {
            await instance({method:'post', url:'/communities', data:input,
                headers:{
                    Authorization:`Bearer ${localStorage.access_token}`
                }
            })
            navigate('/myCommunities')
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
              });
            console.log(error,'<-error add community');
        }
    }
    return(
        <>
    <form style={{width:'30vw', margin:'auto', marginTop:'150px'}} onSubmit={handlerAdd}>
        <center>
            <h3>Add Community</h3>
        </center>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" onChange={(e)=>setInput({...input,name:e.target.value})}/>
        </div>
        <div className="mb-3">
            <label htmlFor="imageUrl" className="form-label">ImageUrl</label>
            <input type="text" className="form-control" id="imageUrl" onChange={(e)=>setInput({...input,imageUrl:e.target.value})}/>
        </div>
        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" id="description" onChange={(e)=>setInput({...input,description:e.target.value})}/>
        </div>
        <div>
            <button type="submit" className="btn btn-primary">Add</button>
        </div>
    </form>
        </>
    )
} 