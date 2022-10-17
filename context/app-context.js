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
    const [done, setDone] = useState(false);
    useEffect(() => {
        AsyncStorage.getItem("authentication").then((data) => {
            const token = JSON.parse(data)
                valid(token).then((newdata) => {
                    if(newdata.result === true){
                        dispatch({ type: "login", payload: newdata });
                    } else {
                        dispatch({type:"logout"})
                    }
                    setDone(true);
                }).catch((e)=>{
                    dispatch({type:"logout"})
                    setDone(true);
                })
        })
    }, [])

    if (!done) {
        return <LoadingOverlay />
    }

    return (<AppContext.Provider value={{ value: auth, dispatch }}>
        {children}
    </AppContext.Provider>);
}