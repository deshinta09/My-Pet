import { createSlice } from "@reduxjs/toolkit";
import Swal from 'sweetalert2'
import axios from "axios";

export const factsSlicer = createSlice({
    name: 'fatch', 
    initialState:{
        fact:''
    },
    reducers:{
        setFacts:(state,action)=>{
            state.fact=action.payload
        }
    }
})

export const { setFacts } = factsSlicer.actions

export const fetchFacts = () => {
    return async (dispatch) => {
        try {
            let {data} = await axios({
                method:'get', url:'https://meowfacts.herokuapp.com/'
            })
            console.log(data.data[0],'<-<<<<<<<<');
            dispatch(setFacts(data?.data[0]))
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: error.response,
              });
            console.log(error,'<-err fetch data');
        }
    }
}

export default factsSlicer.reducer