import React from 'react'
import style from './AdminBoard.module.css'
import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AiFillFolderAdd } from "react-icons/ai";
import { PiListChecksBold } from "react-icons/pi";
import { AiFillHome } from "react-icons/ai";


function AdminBoard() {


    const user = useSelector(state => state.user.user)

    console.log(user)
    const handelclick = () => {
        const confirmed = window.confirm("Are you sure you want to logout?");
        if (confirmed) {
            localStorage.removeItem("token");
            window.location.href = "/";
        }
    }
    function handelHome() {
        window.location.href = "/";
    }


    return (
        <>
            {/* <header>
                <div className={style.container}>
                    <nav className={style.navbar}>
                        <div className={style['navbar-logo']}>
                            <button style={{ border: 'none', borderRadius: '50px' }} onClick={handelHome}>   <Link to="/"> <img src="https://i.graphicmama.com/uploads/2019/3/5c81d12ca5c93-Tasks%20Management%20Logo%20Design.jpg" height="50px" alt=""></img>
                            </Link></button>
                        </div>
                        <div style={{ display: "flex", gap: "20px" }}>
                            <Link to="alltask" className={style.link}><PiListChecksBold />All Tasks</Link>
                            <Link to="addtask" className={style.link}><AiFillFolderAdd />Add Task</Link>
                            <Link to="" className={style.link}><AiFillHome />Home</Link>
                        </div>
                        <div className={style['navbar-links']}>
                            <div className={style['navbar-buttons']}>
                                <p className={style.name}>{user.name}</p>
                                <button className={style['navbar-signup-button']} onClick={handelclick}>Logout</button>
                            </div>
                        </div>
                    </nav>
                </div>
            </header> */}

            <div style={{ display: 'flex' }}>
                <div style={{ backgroundColor: "#f5f7fa", width: "11%", height: "100vh" }}>
                    <aside>
                        <nav style={{ marginTop: "50px" }}>
                            <div className={style['navbar-logo']} style={{ marginTop: '20px', textAlign: 'center' }}>
                                <button style={{ border: 'none', borderRadius: '50px' }} onClick={handelHome}>   <Link to="/"> <img src="https://i.graphicmama.com/uploads/2019/3/5c81d12ca5c93-Tasks%20Management%20Logo%20Design.jpg" height="50px" alt=""></img>
                                </Link></button>
                            </div>
                            <div style={{ display: "flex", gap: "20px", marginLeft: "45px", marginTop: '23px' }}>
                                <Link to="" className={style.link}><AiFillHome />Home</Link>
                            </div>
                            <div style={{ display: "flex", gap: "20px", marginLeft: "45px", marginTop: '23px' }}>
                                <Link to="alltask" className={style.link}><PiListChecksBold />All Tasks</Link>
                            </div>
                            <div style={{ display: "flex", gap: "20px", marginLeft: "45px", marginTop: '23px' }}>
                                <Link to="addtask" className={style.link}><AiFillFolderAdd />Add Task</Link>
                            </div>

                            <div style={{ display: "flex", gap: "20px", marginLeft: "35px", marginTop: '18px' }}>
                                <p className={style.name}>
                                    <img style={{ borderRadius: '50px' }} src='../../public/images/DSC_1580.JPG' alt='asf' height="80px" width="auto"></img>&nbsp;&nbsp;{user.name}
                                </p>
                            </div>
                            <div style={{ marginLeft: "35px" }}>
                                <button className={style['navbar-signup-button']} onClick={handelclick}>Logout</button>
                            </div>
                        </nav>
                    </aside>
                </div>
                <div style={{ margin: 'auto', marginTop: "50px" }}>
                    <Outlet></Outlet>
                </div>
            </div>

            {/* <Outlet></Outlet> */}
        </>

    )
}

export default AdminBoard