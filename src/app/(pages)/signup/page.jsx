"use client"
import Signup from "@/components/Signup/Signup";
import useAuth from "@/context/useAuth";
import authServices from "@/authentication/auth";
import { useRouter } from "next/navigation"; // Note the correct import path for the router
import { useState, useEffect } from 'react';
import { AuthProvider } from '@/context/authContext';
import { motion } from 'framer-motion'

const SignupPage = () => {
    const [authStatus, setAuthStatus] = useState(false);
    const router = useRouter();

    useEffect(() => {
        authServices.isLoggedIn().then(status => {
            setAuthStatus(status);
            if (status) {
                router.replace("/dashboard");
            }
        });
    }, []);

    return (
        <AuthProvider value={{ authStatus, setAuthStatus }}>
            <motion.div
                initial={{ x: '100vw' }}
                animate={{ x: 0 }}
                transition={{ duration: 1, ease: 'easeInOut' }}
            >
                <Signup />
            </motion.div>
        </AuthProvider>
    );
}

export default SignupPage;
