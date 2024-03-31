import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchPost } from "../features/postSlice"
import { useNavigate, useParams } from "react-router-dom"

export default function Post(){
    const navigate = useNavigate()
    const {id} = useParams()
    const dispatch = useDispatch()
    const posts = useSelector((state)=>state.post.list)

    useEffect(()=>{
        dispatch(fetchPost(id))
    },[])
    return(
        <>
        <center style={{marginTop:'50px', fontFamily:'cursive'}}><h2>Post</h2></center>
        
        {posts.length===0 && <center style={{marginTop:'100px', fontFamily:'cursive'}}><h3>No Data</h3></center>}

    <div style={{position:'fixed', bottom:'25px', right:'25px', display:'flex',justifyContent:'center'}}>
        <button className="btn btn-primary" onClick={()=>navigate(`/post/${id}`)}>Add Post</button>
    </div>

        <div style={{display:'flex', justifyContent:'center', margin:'30px auto', fontFamily:'cursive'}}>
            <div style={{flexDirection:'column'}}>
        {
            posts.map(el=>(
<div key={el.id} className="card" style={{width:"30vw", margin: '20px 0'}}>
  <img src={el.imageUrl} className="card-img-top"/>
  <div className="card-body">
    <h5 className="card-title"><strong>{el.title}</strong></h5>
    <p className="card-text">{el.message}</p>
  </div>
</div>
            ))
        }
            </div>
        </div>
    
        </>
    )
}