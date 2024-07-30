import React from 'react'
import Chart from '../components/Chart'
import TaskCount from '../components/TaskCount'
import style from './AdminHome.module.css'
function AdminHome() {
    return (
        <div className={style.maindiv}>
            <Chart></Chart>
            <TaskCount></TaskCount>
        </div>
    )
}
export default AdminHome
