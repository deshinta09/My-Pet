import Swal from 'sweetalert2'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCommunities } from '../features/communitiesSlice'
import { useNavigate } from 'react-router-dom'
import instance from '../config'
import { findUser } from '../features/userSlice'

export default function Communities(){
    const userLogin = useSelector((state)=>state.user.value)
    const allCommunities = useSelector((state)=>state.community.list)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(()=>{
        dispatch(findUser())
        dispatch(fetchCommunities())
    }, [])

    async function handlerAddCommunity(e,id){
        e.preventDefault()
        try {
            await instance({method:'post', url:`/communityUser/${id}`,
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
            console.log(error,'<-err add community');
        }
    }

    return(
        <>
        <div className="row gap-1" style={{marginTop:'70px', justifyContent:'center',fontFamily:'cursive'}}>
            {
                allCommunities.map(el=>(
            <div key={el.id} className="card" style={{width:"18rem", border:'none', marginBottom:'50px'}}>

            <img src={el.imageUrl} className="card-img-top" style={{height:'200px'}}/>
            <div className="card-body">
                <div  style={{height:'170px'}}>
                    <h5 className="card-title">{el.name}</h5>
                    <p className="card-text">{el.description}</p>
                </div>
                <a href="" className="btn btn-primary" onClick={(e)=>handlerAddCommunity(e,el.id)}>Join</a>
                {userLogin.status==='Premium' && <button type='button' className='btn btn-outline-primary' style={{marginLeft:'10px'}}onClick={()=>navigate(`/communities/${el.id}`)}>Open</button>}
            </div>

            </div>
                ))
            }
        </div>
        </>
    )
}