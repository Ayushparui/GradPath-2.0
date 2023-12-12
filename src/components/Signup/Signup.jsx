"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import authServices from "@/authentication/auth";
import styles from "./styles.module.css"
import Link from "next/link";
import Image from "next/image";
import signupImg from "@/../public/signup.jpg"
import google from "@/../public/google.png"
import github from "@/../public/github.png"
import useAuth from "@/context/useAuth";

const Signup = () => {

    const router = useRouter();
    // const { setAuthStatus } = useAuth()
    

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [error, setError] = useState("");

    const create = async (e) => {
        e.preventDefault();
        try {
            const userData = await authServices.signup(formData.name, formData.email, formData.password);
            // console.log(formData.email)
            if (userData) {
                // setAuthStatus(true)
                router.push("/login");
            }
        } catch (error) {

        }
    }

    const Google = async () => {
        try {
            const userData = await authServices.google();
            if (userData) {
                // setAuthStatus(true)
                router.push("/login");
            }
        } catch (error) {
            setError(error.message);
        }
    }
    const Github = async () => {
        try {
            const userData = await authServices.github();
            if (userData) {
                // setAuthStatus(true)
                router.push("/login");
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className={styles.Signup}>

            <div className={styles.Left__image}>
                <Image src={signupImg} layout="fill" objectFit="cover" alt="Signup Image" priority={true}></Image>
            </div>
            <form onSubmit={create} className={styles.Main__form}>
                <Link href={"/login"} className={styles.Login__link}>Login</Link>
                <div className={styles.Form__class}>
                    <div className={styles.Signup__header}>
                        <h1>Create an account</h1>
                        <p className={styles.Signup__header__p}>Its totally free</p>
                    </div>
                    <div className={styles.Signup__auth}>
                        <button onClick={Google} className={styles.google}>
                            <Image src={google} height={20} width={20} alt="Google Icon" priority={true}></Image>
                            Google</button>
                        <button onClick={Github} className={styles.github}>
                            <Image src={github} height={20} width={20} alt="Google Icon" priority={true}></Image>
                            Github</button>
                    </div>

                    <div className={styles.Signup__container}>
                        <div className={styles.between}>
                            <p>Or,register with your email</p>
                        </div>
                        <label htmlFor="name" className={styles.Name}>Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="eg. Shrinid Naik"
                            value={formData.name}
                            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                            required
                            className={styles.Name__input}
                        />
                        <label htmlFor="email" className={styles.Email}>Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="abc@gmail.com"
                            value={formData.email}
                            onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                            required
                        />
                        <label htmlFor="password" className={styles.Password}>Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="1234@#$asdsf"
                            value={formData.password}
                            onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                            required
                        />
                        <button type="submit" className={styles.create__button}>
                            Create Account
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup;