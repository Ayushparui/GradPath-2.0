"use client"
import authServices from "@/authentication/auth";
import styles from "./styles.module.css";
import { useState } from "react"
import { useRouter } from "next/navigation";
import useAuth from "@/context/useAuth";
import Link from "next/link";
import Image from "next/image";
import loginImg from "@/../public/login.jpg"

const Login = () => {


    const router = useRouter()
    const { setAuthStatus } = useAuth()
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const login = async (e) => {
        e.preventDefault()
        try {
            const data = await authServices.login(formData.email, formData.password)
            console.log("User data: " + data)
            console.log("Auth status is: " + setAuthStatus)
            if (data) {
                console.log("Logged In Sucessful")
                // setAuthStatus(true)
                console.log("Auth status is: " + setAuthStatus)
                setAuthStatus(true)
                router.push("/project-hub")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const googleAuth = (e) => {
        e.preventDefault()
        try {
            const data = authServices.google()
            if (data) {
                console.log("Logged In Sucessful")
                // setAuthStatus(true)
                console.log("Auth status is: " + setAuthStatus)
                setAuthStatus(true)
                router.push("/project-hub")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const githubAuth = (e) => {
        e.preventDefault()
        try {
            const data = authServices.github()
            if (data) {
                console.log("Logged In Sucessful")
                // setAuthStatus(true)
                console.log("Auth status is: " + setAuthStatus)
                setAuthStatus(true)
                router.push("/project-hub")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const forgotPass = (e) => {
        e.preventDefault()
        try {
            const data = authServices.forgotPass(formData.email)
            if (data) {
                console.log("Password Reset Email Sent")
                router.push("/login")
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className={styles.Login}>
            <div className={styles.Empty__page}>
                <Image src={loginImg} alt="Login Image" layout="fill" objectFit="cover" priority={true}></Image>
            </div>

            <div className={styles.Login__page}>
                <div className={styles.Login__Auth}>
                    <h1>
                        Welcome Back
                    </h1>
                    <p>Continue with Google or Github</p>
                    <button onClick={googleAuth}>Google</button>
                    <button onClick={githubAuth}>Github</button>
                </div>

                <div className={styles.Login__form}>
                    <form onSubmit={login} className={styles.Login__form_main}>
                        <p>or</p>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        />
                        <label htmlFor="password">Passowrd</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                            required
                        />
                        <button>Login</button>
                    </form>
                    <Link href={'/reset-password'} className={styles.reset_password}>Forgot password</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;