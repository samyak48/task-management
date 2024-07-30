import React from 'react'
import PageNav from '../components/PageNav'
import style from './Home.module.css'
import { Link } from 'react-router-dom'
import Login from './Login'
import { Toaster } from 'react-hot-toast'
function Home() {
    return (
        <div>
            <PageNav></PageNav>
            <Toaster></Toaster>
            <section className={style['slider-section']}>
                <div className={style.container}>
                    <div className={style['slider-main']} style={{ display: 'flex' }}>
                        <div className={`${style['slider-content-left']} ${style.flex}`} id="header-content-left">
                            <p className={style['main-content-header']}>
                                Tips and Strategies <span>from 10 years</span>
                            </p>
                            <p className={style['sub-content-header']}>
                                How to effectively manage your projects and tasks using our system.
                            </p>
                            <Link to="/signup" className={style['register-btn']}>Register</Link>
                        </div>
                        <div className={style['slider-content-right']}>
                            <Login></Login>
                            {/* <img src='https://i.pinimg.com/originals/ab/94/af/ab94afad0d4b0ff2340fbc6490c28c3e.png' alt='' height="400px"></img> */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Home


