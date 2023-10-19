import React, { useContext} from "react";
import { authContext } from "./authContext";


const useAuth = () => {
    const data = useContext(authContext)
    console.log("useAuth: " + data.authStatus)
    return data
}

export default useAuth