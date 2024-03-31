import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2'
import instance from "../config";

export const myCommunitiesSlice = createSlice({
    name:'myCommunities',
    initialState:{
        list:[]
    },
    reducers:{
        setMyCommunities:(state,action)=>{
            state.list=action.payload
        }
    }
})

export const { setMyCommunities } = myCommunitiesSlice.actions

export const fetchMC = ()=>{
    return async (dispatch) =>{
        try {
            let {data} = await instance({method:'get',url:'/communities/myCommunities',
                headers:{
                    Authorization:`Bearer ${localStorage.access_token}`
                }
            })
            dispatch(setMyCommunities(data))
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
              });
            console.log(error,'<- err my communities');
        }
    }
}

export default myCommunitiesSlice.reducer