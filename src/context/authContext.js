
import { createContext } from "react";

export const authContext = createContext({
    authStatus: false,
    setAuthStatus: () => {}
})


export const AuthProvider = authContext.Provider

export default authContext