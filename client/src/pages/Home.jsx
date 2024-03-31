import axios from "axios";
import Swal from 'sweetalert2'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchFacts } from "../features/factsSlice";

export default function Home(){
    const dispatch = useDispatch()
    const catFacts = useSelector((state)=>state.facts.fact)
    const [input,setInput] = useState('')
    const [animal,setAnimal] = useState([])
    const [isActive, setIsActive] = useState(false)

    async function handlerSearch(e){
        e.preventDefault()
        try {
            let {data} = await axios({
                method:'get', 
                url:`https://animals-by-api-ninjas.p.rapidapi.com/v1/animals?name=${input}`,
                headers:{
                "X-RapidAPI-Key":"9061a9e6c5msh1b0121654fea6a2p16c315jsncac460726481",
                "X-RapidAPI-Host":"animals-by-api-ninjas.p.rapidapi.com"
                }
            })
            if(data.length === 0 ){
                setAnimal([])
                setIsActive(true)
            } else {
                setIsActive(false)
                setAnimal(data)
            }
            // console.log(data,'<===');
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
              });
            console.log(error,'<-err search');
        }
    }

    useEffect(()=>{
        dispatch(fetchFacts())
    },[])

    return(
        <>
        <br />
        <center style={{fontFamily:'cursive'}}>
            {/* <h1>Welcome to My Pet</h1> */}
            <img src="/paw.png" style={{width:'20vw'}} />
            <p><strong>Are you familiar with this cat fact?</strong></p>
            <p style={{width:'20rem'}}>{catFacts}</p>
            
            <form onSubmit={handlerSearch} style={{marginTop:'20px',display:'flex', width:'30vw'}}>
                <input type="text" className="form-control" id="animal" onChange={(e)=>setInput(e.target.value)} placeholder="search your pet here!" value={input}/>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

        </center>
        <div className="row gap-3" style={{marginTop:'70px', justifyContent:'center',fontFamily:'cursive'}}>
            
        {
           animal?.map((el,i)=>(
        <div key={i} className="card" style={{width:"18rem", marginBottom:'10px'}}>

        <div className="card-body">
            <div>
                <h5 className="card-title">{el.name}</h5>
                <p>{el?.taxonomy?.kingdom}</p>
                <p className="card-text">
                {
                    el?.locations?.map(n=>n+', ')
                }
                </p>
            </div>
        </div>

        </div>

            )) 
        }
        {
            isActive && <h1><center>No Data Match</center></h1>
        }
        </div>
        </>
    )
}