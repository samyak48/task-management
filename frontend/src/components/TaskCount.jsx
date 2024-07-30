import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatus } from '../slices/statusslice';
import style from './TaskCount.module.css'
function TaskCount() {
    const dispatch = useDispatch();
    const status = useSelector(state => state.status.tasks);
    useEffect(() => {
        dispatch(fetchStatus())
    }, [dispatch])
    console.log(status)
    const totalTask = (status.todayCompletedTasksCount + status.overdueTasksCount + status.pendingTasksCount + status.completedTasksCount) - status.todayCompletedTasksCount
    // console.log(totalTask)
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={`${style.card} ${style['card-1']}`} style={{ backgroundColor: "rgba(75, 192, 192, 0.2)", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div className={style.text}>today Completed Tasks Count</div>
                        <div className={style.letter}>{status.todayCompletedTasksCount}</div>
                    </div>
                    <div className={`${style.card} ${style['card-1']}`} style={{ backgroundColor: "rgba(255, 99, 132, 0.2)", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div className={style.text1}>overdue Tasks Count</div>
                        <div className={style.letter}>{status.overdueTasksCount}</div>
                    </div>

                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={`${style.card} ${style['card-1']}`} style={{ backgroundColor: "rgba(255, 206, 86, 0.2)", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div className={style.text2}>pending Tasks Count</div>
                        <div className={style.letter}>{status.pendingTasksCount}</div>
                    </div>
                    <div className={`${style.card} ${style['card-1']}`} style={{ backgroundColor: "rgba(54, 162, 235, 0.1)", display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div className={style.text3}>completed Tasks Count</div>
                        <div className={style.letter}> {status.completedTasksCount}</div>
                    </div>
                </div>
            </div>
            <div className={`${style.totalcount} ${style['card-1']}`}>
                <div className={style.totaltext}>total task</div>
                <div style={{ fontSize: '30px', fontWeight: "900" }}>{totalTask}</div>
            </div>
        </div>
    )
}
export default TaskCount