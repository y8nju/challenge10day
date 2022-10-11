import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useReducer, useState } from "react";
import LoadingOverlay from "../components/loadingOverlay";
import { valid } from "../util/accountAPI";


export const AppContext = createContext({});


const authReducer = (state, action) => {
    switch (action.type) {
        case "login":
            return action.payload;
        case "logout":
            return null;
    }
    return null;
}

export function AppContextProvider({ children }) {
    const [auth, dispatch] = useReducer(authReducer, null);
    const [done,setDone] = useState(false);
    useEffect(() => {
        AsyncStorage.getItem("authentication").then((data) => {
            const token = JSON.parse(data)
            console.log(token);
            if(data){
                valid(token).then((newdata)=>{
                    console.log("newdata",newdata)
                   dispatch({type:"login",payload:newdata});
                   setDone(true);
                })
        } else {
            setDone(true);
        }
    })
    }, [])

        if(!done){
            return <LoadingOverlay />
        }

    return (<AppContext.Provider value={{ value: auth, dispatch }}>
        {children}
    </AppContext.Provider>);
}