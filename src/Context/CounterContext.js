import { createContext, useState } from "react";

export let counterContext= createContext()

export default function CounterContextProvider (props){

    let [counter,setCounter]= useState(10)
    let x=10;

    function inc (){

        setCounter(Math.random()*10)
    }

    return   <counterContext.Provider value={{counter,inc}}>

    {props.children}
</counterContext.Provider>
}