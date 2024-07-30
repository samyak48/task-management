import React from 'react'
import style from './UserBoard.module.css'
import { Link, Outlet } from 'react-router-dom'
import { PiListChecksBold } from 'react-icons/pi'
import { useSelector } from 'react-redux'
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
function UserBoard() {
    const user = useSelector(state => state.user.user)

    function handelHome() {
        window.location.href = "/";
    }
    const handelclick = () => {
        const confirmed = window.confirm("Are you sure you want to logout?");
        if (confirmed) {
            localStorage.removeItem("token");
            window.location.href = "/";
        }
    }
    return (
        <>
            {/* <header>
                <div className={style.container}>
                    <nav className={style.navbar}>
                        <div className={style['navbar-logo']}>
                            <button style={{ border: 'none', borderRadius: '50px' }} onClick={handelHome}  > <Link to="/"> <img src="https://i.graphicmama.com/uploads/2019/3/5c81d12ca5c93-Tasks%20Management%20Logo%20Design.jpg" height="50px" alt=""></img>
                            </Link></button>
                        </div>
                        <div style={{ display: "flex", gap: "20px" }}>
                            <Link to="alltask" className={style.link}><PiListChecksBold />All Tasks</Link>
                            <Link to="" className={style.link}><AiFillHome />Home</Link>
                        </div>
                        <div className={style['navbar-links']}>
                            <div className={style['navbar-buttons']}>
                                <p className={style.name}>{user.name}</p>
                                <button className={style['navbar-signup-button']} onClick={handelclick} >Logout</button>
                            </div>
                        </div>
                    </nav>
                </div>
            </header> */}
            <div style={{ display: 'flex' }}>
                <div style={{ backgroundColor: "#f5f7fa", width: "11%", height: "100vh" }}>
                    <aside >
                        <nav style={{ marginTop: "50px" }}>
                            <div className={style['navbar-logo']} style={{ marginTop: '20px', textAlign: 'center' }}>
                                <button style={{ border: 'none', borderRadius: '50px' }} onClick={handelHome}  > <Link to="/"> <img src="https://i.graphicmama.com/uploads/2019/3/5c81d12ca5c93-Tasks%20Management%20Logo%20Design.jpg" height="50px" alt=""></img>
                                </Link></button>
                            </div>
                            <div style={{ display: "flex", gap: "20px", marginLeft: "35px", marginTop: '18px' }}>
                                <Link to="" className={style.link}><AiFillHome />Home</Link>
                            </div>
                            <div style={{ display: "flex", gap: "20px", marginLeft: "35px", marginTop: '18px' }}>
                                <Link to="alltask" className={style.link}><PiListChecksBold />All Tasks</Link>
                            </div>

                            <div className={style['navbar-links']} style={{ marginLeft: "20px" }}>
                                <div className={style['navbar-buttons']}>
                                    <p className={style.name}><img style={{ borderRadius: '50px' }} src='../../public/images/DSC_1580.JPG' alt='asf' height="80px" width="auto"></img>&nbsp;&nbsp;{user.name}</p>

                                </div>
                            </div>
                            <button style={{ textAlign: 'center', marginLeft: "25px" }} className={style['navbar-signup-button']} onClick={handelclick} ><AiOutlineLogout />Logout</button>
                        </nav>
                    </aside>
                </div>
                <div style={{ margin: 'auto', marginTop: "50px" }}>
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}
export default UserBoard