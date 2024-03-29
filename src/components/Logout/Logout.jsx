"use client";
import authServices from "@/authentication/auth"
import { useRouter } from "next/navigation";
import styles from "./styles.module.css"



const Logout = () => {

    const router = useRouter()

    const logout = async () => {
        try {
            const logout = await authServices.logout()
           if(logout){
            router.push("/login")
           }
            
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <button className={styles.logout} onClick={logout}>Logout</button>
        </>
    )
}

export default Logout