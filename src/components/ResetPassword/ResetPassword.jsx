"use client"
import { useState } from 'react'
import authServices from '@/authentication/auth'
import { useRouter } from 'next/navigation'
import styles from './styles.module.css'
import Dog from "@/../public/Dog.png"
import Image from 'next/image'

const ResetPassword = () => {

    const [email, setEmail] = useState("")
    const router = useRouter()
    const Reset = (e) => {
        e.preventDefault()
        try {
            const data = authServices.forgotPassword(email)
            if (data) {
                console.log("A link has been sent to the email")
                router.push("/login")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <div className={styles.Reset}>
            <div className={styles.left_side}>
                <Image src={Dog} alt='Forgot Password' height={600} width={500}></Image>
            </div>
            <div className={styles.right_side}>
                <div className={styles.inside_text}>
                    <h1 className={styles.right_side_h1}>Forgot <br /> Password?</h1>
                    <p className={styles.right_side_p}>Enter the email address associated with your account</p>
                
                <form onSubmit={Reset}>
                    <input
                    type="email"
                    id="email"
                    placeholder="abc@gmail.com"
                    required 
                    value={email.email}
                    onChange={(e) => setEmail(e.target.value)}/>
                    <button>Submit</button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword