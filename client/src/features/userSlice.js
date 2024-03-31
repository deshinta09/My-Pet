import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2'
import instance from "../config";

export const userSlice = createSlice({
    name:'user', 
    initialState:{
        value:{}
    },
    reducers:{
        setUser:(state,action) => {
            state.value=action.payload
        }
    }
})

export const { setUser } = userSlice.actions

export const findUser = ()=> {
    return async (dispatch) =>{
        try {
            let {data} = await instance({method:'get', url:'/user',
                headers:{
                    Authorization:`Bearer ${localStorage.access_token}`
                }
            })
            dispatch(setUser(data))
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response.data.message,
              });
            console.log(error,'<- find user');
        }
    }
}

export default userSlice.reducer