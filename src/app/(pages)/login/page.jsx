"use client"
import Login from "@/components/Login/Login"
import useAuth from "@/context/useAuth"
import { useRouter } from "next/navigation"
import { motion } from 'framer-motion'

const LoginPage = () => {

    const router = useRouter()
    const { authStatus } = useAuth()

    if (authStatus) {
        router.replace("/dashboard")
        return <></>
    }
    return (
        <>
            <motion.div
                initial={{ x: '-100vw' }}
                animate={{ x: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
            >
                <Login />
            </motion.div>
        </>
    )
}
export default LoginPage