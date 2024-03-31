import Swal from 'sweetalert2'
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMC } from "../features/myCommunitiesSlice"
import { useNavigate } from "react-router-dom"
import instance from '../config'

export default function MyCommunity(){
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const myCommunity = useSelector((state)=>state.myCommunity.list)

    useEffect(()=>{
        dispatch(fetchMC())
    }, [])

    async function handlerOut(id){
        try {
            await instance({method:'delete', url:`/communityUser/${id}`,
                headers:{
                    Authorization:`Bearer ${localStorage.access_token}`
                }
            })
            dispatch(fetchMC())
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
              });
            console.log(error,'<-err out comunity');
        }
    }

    return(
        <>
    <div style={{fontFamily:'cursive'}}>
        {myCommunity.length===0 && <center style={{marginTop:'100px'}}><h2>No Data</h2></center>}
            {
            myCommunity.map(el=>(
        <div className="row"  key={el.id} style={{justifyContent:'center'}}>

        <div className="card" style={{width:'90vw'}}>

        <div className="card-body" style={{display:'flex', justifyContent:'space-between', margin:'0px 20px'}}>
            <div>
                <h5 className="card-title">{el.name}</h5>
                <p className="card-text">{el.description}</p>
            </div>
            <div>
                <button type="button" className="btn btn-primary" onClick={()=>navigate(`/communities/${el.id}`)} style={{marginRight:'10px'}}>Open</button>
                <button type="button" className="btn btn-outline-danger" onClick={()=>handlerOut(el.id)}>Out Community</button>

            </div>
        </div>

        </div>

        </div>
            ))
            }
            <br />
            <div style={{position:'fixed', bottom:'25px', right:'25px', display:'flex',justifyContent:'center'}}>

                <button className="btn btn-primary" onClick={()=>navigate('/community')}>Add Community</button>
            </div>
    </div>
        </>
    )
}