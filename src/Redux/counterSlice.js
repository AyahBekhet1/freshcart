import { createSlice } from "@reduxjs/toolkit";


let initialState = {
    counter:0
}

let counterSlice = createSlice({
    name:'counter',
    initialState,
    reducers:{
        increase:(state,action)=>{
            state.counter++
            console.log(action);
        },
        decrease:(state)=>{
            state.counter--
        },
        incrementBynum:(state,action)=>{
            state.counter+=action.payload
        }
    }
    
})


export let counterReducer = counterSlice.reducer

export let {increase , decrease,incrementBynum} = counterSlice.actions

