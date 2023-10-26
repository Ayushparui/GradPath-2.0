import React, { useContext} from "react";
import { authContext } from "./authContext";


const useAuth = () => {
    const data = useContext(authContext)
    
    return data
}

export default useAuth