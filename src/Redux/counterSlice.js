import { createSlice } from "@reduxjs/toolkit";


let initialState = {
    counter:0
}

let counterSlice = createSlice({
    name:'counter',
    initialState,
    reducers:{
        increase:(state)=>{
            state.counter++
        }
    }
    
})


export let counterReducer = counterSlice.reducer
