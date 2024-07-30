// import React, { useState } from 'react'
// import style from './Signup.module.css'
// import PageNav from '../components/PageNav'
// function Signup() {
//     const [name, setName] = useState("")
//     const [email, setEmail] = useState("")
//     const [password, setPassword] = useState("")

//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         const newuser = { name: name, email: email, password: password }
//         try {
//             const reaponce = await fetch("http://localhost:3005/user/signup", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify(newuser)
//             })
//             if (reaponce.ok) {
//                 const data = await reaponce.json()
//                 console.log(data)
//             }
//             else {
//                 const error = await reaponce.json()
//                 console.log(error.message)
//             }
//         } catch (e) {
//             console.log(e)
//         }
//     }

//     return (
//         <>
//             <PageNav />
//             <form onSubmit={handleSubmit}>
//                 <div className={style.form} style={{ margin: 'auto', marginTop: "50px" }}>
//                     <div className={style.title}>Welcome</div>
//                     <div className={style.subtitle}>Let's create your account!</div>
//                     <div className={`${style.inputContainer} ${style.ic1}`}>
//                         <input
//                             id="firstname"
//                             className={style.input}
//                             type="text"
//                             name='name'
//                             placeholder="Full name"
//                             value={name}
//                             onChange={(e) => setName(e.target.value)}
//                         />
//                     </div>
//                     <div className={`${style.inputContainer} ${style.ic2}`} style={{ marginBottom: "30px" }}>
//                         <input
//                             id="lastname"
//                             className={style.input}
//                             type="email"
//                             name='email'
//                             placeholder="Email"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <div className={`${style.inputContainer} ${style.ic3}`}>
//                         <input
//                             id="password"
//                             className={style.input}
//                             type="password"
//                             name='password'
//                             placeholder="Password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                     </div>
//                     <button type="submit" className={style.submit}>Register</button>
//                 </div>
//             </form>
//         </>
//     )
// }
// export default Signup

import React from 'react';
import { useForm } from 'react-hook-form';
import style from './Signup.module.css';
import PageNav from '../components/PageNav';
import { Toaster } from 'react-hot-toast'
import { useDispatch } from 'react-redux';
import { registerUser } from '../slices/userslice';
function Signup() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const dispatch = useDispatch()

    const onSubmit = async (data) => {
        dispatch(registerUser(data))
        reset()
        // try {
        //     const response = await fetch("http://localhost:3005/user/signup", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json"
        //         },
        //         body: JSON.stringify(data)
        //     });
        //     if (response.ok) {
        //         const result = await response.json();
        //         // console.log(result);
        //         reset();
        //         toast.success("Successfully registered")
        //     } else {
        //         const error = await response.json();
        //         console.log(error.message);
        //         toast.error(error.message);
        //     }
        // } catch (e) {
        //     console.log(e);
        // }
    };

    return (
        <>
            <PageNav />
            <Toaster></Toaster>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={style.form} style={{ margin: 'auto', marginTop: "50px" }}>
                    <div className={style.title}>Welcome</div>
                    <div className={style.subtitle}>Let's create your account!</div>
                    <div className={`${style.inputContainer} ${style.ic1}`}>
                        <input
                            id="fullname"
                            className={style.input}
                            type="text"
                            placeholder="Full name"
                            {...register('name', { required: 'Full name is required' })}
                        />
                        {errors.name && <p className={style.error}>{errors.name.message}</p>}
                    </div>
                    <div className={`${style.inputContainer} ${style.ic2}`} style={{ marginBottom: "30px" }}>
                        <input
                            id="email"
                            className={style.input}
                            type="email"
                            placeholder="Email"
                            {...register('email', { required: 'Email is required', pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: 'Email is not valid' } })}
                        />
                        {errors.email && <p className={style.error}>{errors.email.message}</p>}
                    </div>
                    <div className={`${style.inputContainer} ${style.ic3}`}>
                        <input
                            id="password"
                            className={style.input}
                            type="password"
                            placeholder="Password"
                            {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Password must be at least 6 characters' } })}
                        />
                        {errors.password && <p className={style.error}>{errors.password.message}</p>}
                    </div>
                    <button type="submit" className={style.submit}>Register</button>
                </div>
            </form>
        </>
    );
}
export default Signup;
