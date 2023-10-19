"use client"
import { useState, useEffect } from 'react'
import authServices from '@/authentication/auth'

const UpdatePassword = () => {


    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search)
        const fetchedUserId = queryParams.get("userId")
        const fetchedSecretKey = queryParams.get("secret")


        setPassword((prev) => ({...prev, userId: fetchedUserId, secretKey: fetchedSecretKey}))
    }, [])


    const [password, setPassword] = useState({
        userId: "",
        secretKey: "",
        password: "",
        cpassword: ""
    })


    const updatePassword = (e) => {
        e.preventDefault()
        try {
            const data = authServices.upPassword(password.userId, password.secretKey, password.password, password.cpassword)
            if (data) {
                console.log("Reset Password Sucessful")
                console.log(password.userId, password.secretKey, password.password, password.cpassword)
                router.push("/login")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <>
            <form onSubmit={updatePassword}>
                <label htmlFor="password">Password</label>
            <input
            type="password"
            id="password"
            placeholder="1234!@#$asdf"
            required 
            value={password.password}
            onChange={(e) => setPassword((prev) => ({...prev, password: e.target.value}))}/>
                <label htmlFor="cpassword">Confirm Password</label>
            <input
            type="password"
            id="cpassword"
            placeholder="1234!@#$asdf"
            required 
            value={password.cpassword}
            onChange={(e) => setPassword((prev) => ({...prev, cpassword: e.target.value}))}/>
            <button>Sumbmit</button>
            </form>
        </>
    )
}

export default UpdatePassword