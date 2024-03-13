import { createContext, useState } from "react";

export let UserContext= createContext()


export default function UserContextProvider(props){
const [userToken , setUserToken] = useState(null)

// setUserToken(localStorage.getItem('userToken'))

// console.log(userToken);

    return <UserContext.Provider value={{userToken , setUserToken}} >
        {props.children}
    </UserContext.Provider>
 }