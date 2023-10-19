"use client"
import { useRouter } from "next/navigation";



const Dashboard = () => {

    const router = useRouter();
    const profile = () => {
        router.push("/profile")
    }

    return (
        <>
            <h1>Welcome to Dashboard</h1>
            {/* <button onClick={profile}>Profile</button> */}
            
        </>
    )
}

export default Dashboard;