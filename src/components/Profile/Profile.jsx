"use client"
import authServices from "@/authentication/auth"

const Profile = () => {
    return (
        <>
            <button onClick={() => {console.log(authServices.getUser())}}>Show User</button>
            
        </>
    )
}
export default Profile