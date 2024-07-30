import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMyStatus } from '../slices/statusslice';
import style from './UserTasksCounter.module.css'
function UserTasksCounter() {
    const dispatch = useDispatch();
    const status = useSelector(state => state.status.tasks);
    console.log(status)
    useEffect(() => {
        dispatch(fetchMyStatus())
    }, [dispatch])
    // useEffect(() => {
    //     async function getMyTaskStatus() {
    //         const responce = await fetch("http://localhost:3005/task/mytaskstatus", {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${localStorage.getItem("token")}`
    //             }
    //         })
    //         const data = await responce.json()
    //         console.log(data)
    //     }
    //     getMyTaskStatus()
    // }, [])
    const totalTask = (status.todayCompletedTasksCount + status.overdueTasksCount + status.pendingTasksCount + status.completedTasksCount) - status.todayCompletedTasksCount
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={`${style.card} ${style['card-1']}`} style={{ backgroundColor: "#775DD0", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div className={style.text}>today Completed Tasks Count</div>
                        <div className={style.letter}>{status.todayCompletedTasksCount}</div>
                    </div>
                    <div className={`${style.card} ${style['card-1']}`} style={{ backgroundColor: "#FF4560", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div className={style.text1}>overdue Tasks Count</div>
                        <div className={style.letter}>{status.overdueTasksCount}</div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={`${style.card} ${style['card-1']}`} style={{ backgroundColor: "#FEB019", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div className={style.text2}>pending Tasks Count</div>
                        <div className={style.letter}>{status.pendingTasksCount}</div>
                    </div>
                    <div className={`${style.card} ${style['card-1']}`} style={{ backgroundColor: "#00E396", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div className={style.text3}>completed Tasks Count</div>
                        <div className={style.letter}> {status.completedTasksCount}</div>
                    </div>
                </div>
            </div>
            <div className={`${style.totalcount} ${style['card-1']}`}>
                <div className={style.totaltext}>total task</div>
                <div style={{ fontSize: '30px', fontWeight: "900" }}>{totalTask}</div>
            </div>
        </div>)
}
export default UserTasksCounter