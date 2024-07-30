import { Link } from "react-router-dom";
import style from './PageNav.module.css'
import { AiOutlineLogin } from "react-icons/ai";
import { AiOutlineLogout } from "react-icons/ai";
function PageNav() {
    return (
        <>
            <header>
                <div className={style.container}>
                    <nav className={style.navbar}>
                        <div className={style['navbar-logo']}>
                            <Link to="/"> <img src="https://i.graphicmama.com/uploads/2019/3/5c81d12ca5c93-Tasks%20Management%20Logo%20Design.jpg" height="50px" alt=""></img>
                            </Link>
                        </div>
                        <div className={style['navbar-links']}>
                            <div className={style['navbar-buttons']}>
                                <Link to="/signup" className={style['navbar-login-button']}><AiOutlineLogin />
                                    Signup</Link>
                                <Link to="/" className={style['navbar-signup-button']}><AiOutlineLogout />
                                    Login</Link>
                            </div>
                        </div>
                    </nav>
                </div>

            </header>

        </>
    )
}
export default PageNav