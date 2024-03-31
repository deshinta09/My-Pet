import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2'
import instance from "../config";

export const communitiesSlice = createSlice({
    name:'community',
    initialState:{
        list:[]
    },
    reducers:{
        setCommunities:(state,action)=>{
            state.list = action.payload
        }
    }
})

export const { setCommunities } = communitiesSlice.actions

export const fetchCommunities = ()=>{
    return async (dispatch) => {
        try {
            let {data} = await instance({method:'get', url:'/communities',
                headers:{
                    Authorization:`Bearer ${localStorage.access_token}`
                }
            })
            dispatch(setCommunities(data))
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
              });
            console.log(error,'<-error di fetch community');
        }
    }
}

export default communitiesSlice.reducer