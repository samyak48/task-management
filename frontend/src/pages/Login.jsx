import React, { useState } from 'react'
import style from './Login.module.css'
import { loginUser } from '../slices/userslice'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
// import PageNav from '../components/PageNav'
function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const navigate = useNavigate()

    const handelEmail = (e) => {
        setEmail(e.target.value)
    }
    const handelPassword = (e) => {
        setPassword(e.target.value)
    }

    const handelSubmit = async (e) => {
        e.preventDefault()
        dispatch(loginUser({ email, password }))
        toast.success("login success", {
            duration: 4000,
            // position: 'top-right',
            style: {
                background: '#000',
                color: '#fff'
            }
        })
        // try {
        //     const responce = await fetch("http://localhost:3005/user/login", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify({
        //             email: email,
        //             password: password
        //         })
        //     })
        //     if (responce.ok) {
        //         const result = await responce.json()
        //         // console.log(result)
        //         toast.success("Successfully logeding")
        //         setEmail("")
        //         setPassword("")
        //     }
        //     else {
        //         const result = await responce.json()
        //         toast.error(result.message)
        //         setEmail("")
        //         setPassword("")
        //     }
        // } catch (e) {
        //     console.log(e)
        // }
    }
    useEffect(() => {
        if (user.status === 'succeeded') {
            if (user.user && user.user.role === 'user') {
                navigate('/userdashboard');
            } else if (user.user && user.user.role === 'admin') {
                navigate('/admindashboard');
            }
        } else if (user.status === 'failed') {
            toast.error(user.error);
        }
    }, [user, navigate]);

    return (
        <>
            {/* <PageNav></PageNav> */}
            <Toaster></Toaster>
            <form onSubmit={handelSubmit}>
                <div className={style.form}>
                    <div className={style.title}>Welcome</div>
                    <div className={style.subtitle}>Let's Login your account!</div>
                    <div className={`${style.inputContainer} ${style.ic2}`}>
                        <input id="lastname" className={style.input} type="email" name='email' placeholder="Email" required={true} value={email} onChange={handelEmail} />
                    </div>
                    <div className={`${style.inputContainer} ${style.ic2}`}>
                        <input id="email" className={style.input} type="passwod" name='passwod' placeholder="Password" required={true} value={password} onChange={handelPassword} />
                    </div>
                    <button type="text" className={style.submit}>Login</button>
                </div>
            </form>
        </>
    )
}
export default Login
