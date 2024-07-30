import React from 'react';
import { Link } from 'react-router-dom';
import style from './Error.module.css'
function Error() {

    return (
        <div className={style.container}>
            <div>
                <h1 className={style.title}>Oops!</h1>
                <h2 className={style.subtitle}>404 Not Found</h2>
                <div className={style.details}>
                    Sorry, an error has occurred, requested page not found!
                </div>
                <div>
                    <Link to="/" className={style.link}>Take Me Home</Link>
                </div>
            </div>
        </div>
    );
}

export default Error;
