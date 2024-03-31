import { createSlice } from "@reduxjs/toolkit";
import instance from "../config";

export const postSlice = createSlice({
    name:'post',
    initialState:{
        list:[]
    },
    reducers:{
        setPost:(state,action)=>{
            state.list=action.payload
        }
    }
})

export const { setPost } = postSlice.actions

export const fetchPost = (id) =>{
    return async (dispatch) =>{
        try {
            let {data} = await instance({method:'get', url:'/posts/'+id,
                headers:{
                    Authorization:`Bearer ${localStorage.access_token}`
                }
            })
            dispatch(setPost(data))
        } catch (error) {
            console.log(error,'<-err di fetch post');
        }
    }
}

export default postSlice.reducer