import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserTasks, updateUserTaskStatus } from '../slices/taskslice'
import { fetchMyStatus } from '../slices/statusslice'
import style from './Usertask.module.css'
import './Paginate.css'
function Usertask() {
    const dispatch = useDispatch()
    const userTasks = useSelector(state => state.tasks.tasks)
    const status = useSelector(state => state.status.tasks);
    const totalTask = (status.todayCompletedTasksCount + status.overdueTasksCount + status.pendingTasksCount + status.completedTasksCount) - status.todayCompletedTasksCount
    const itemPerPage = 2
    const pageNumber = totalTask && Math.ceil(totalTask / itemPerPage)
    // console.log(pageNumber)
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [startDateFilter, setStartDateFilter] = useState('');
    const [endDateFilter, setEndDateFilter] = useState('');
    const [step, setStep] = useState(1)
    // console.log(step)
    console.log(userTasks)
    useEffect(() => {
        dispatch(fetchUserTasks(step))
        dispatch(fetchMyStatus())
    }, [dispatch, step])
    async function handelComplete(id) {
        // dispatch(fetchUserTasks())
        const status = "completed"
        await dispatch(updateUserTaskStatus({ id, status }))
        await dispatch(fetchUserTasks())
    }
    async function handelPeading(id) {
        // dispatch(fetchUserTasks())
        const status = "pending"
        await dispatch(updateUserTaskStatus({ id, status }))
        await dispatch(fetchUserTasks())
    }
    const filteredTasks = userTasks.filter(task => {
        const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus ||
            (selectedStatus === 'overdue' && new Date(task.endDate) < new Date() && task.status !== 'completed');
        const matchesStartDate = !startDateFilter || new Date(task.startDate).toDateString() === new Date(startDateFilter).toDateString();
        const matchesEndDate = !endDateFilter || new Date(task.endDate).toDateString() === new Date(endDateFilter).toDateString();
        return matchesStatus && matchesStartDate && matchesEndDate;
    });
    function goToNextStape() {

        if (step > 1) {
            setStep((step) => step - 1)
        }
    }
    function goToPriviousStep() {
        if (step < pageNumber) {
            setStep((step) => step + 1)
        }
    }
    // useEffect(() => {
    //     async function getAlluserTasks() {
    //         const response = await fetch('http://localhost:3005/user/getmytasks', {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${localStorage.getItem("token")}`
    //             }
    //         })  
    //         const data = await response.json()
    //         console.log(data.tasks)
    //     }
    //     getAlluserTasks()
    // })
    return (

        // <>
        //     <ul style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        //         {userTasks.map(task => (
        //             <li key={task.id} style={{ listStyle: 'none' }}>
        //                 <div style={{ padding: "10px 5px" }} className={`${style.card} ${style['card-1']}`}>
        //                     <p style={{ marginLeft: '5px' }} className={style.taskname}>Task:-{task.taskName}</p>
        //                     <p style={{ marginLeft: '5px' }} className={style.description}>description:-{task.description}</p>
        //                     <p style={{ marginLeft: '5px' }}
        //                         className={`${task.status === 'completed'
        //                             ? style.completed : new Date(task.endDate).toDateString() === new Date().toDateString() && task.status !== 'completed'
        //                                 ? style.dueToday
        //                                 : new Date(task.endDate) < new Date() && task.status !== 'completed'
        //                                     ? style.overdue
        //                                     : new Date(task.endDate) > new Date() && task.status !== 'completed'
        //                                         ? style.pending
        //                                         : ''}
        //                     `}>
        //                         {/* {task.status} */}
        //                         <span className={style.description}>status:-</span>
        // {
        //     new Date(task.endDate).toDateString() > new Date().toDateString() && task.status !== 'completed' ? "overdue" : task.status

        // }
        //                         {/* {
        //                             new Date(task.endDate).toDateString() > new Date().toDateString() && task.status !== 'completed' ? "overdue" : task.status

        //                         } */}
        //                     </p>
        //                     <p style={{ marginLeft: '5px' }} className={style.description}>
        //                         <span className={style.description}>Start Date:-</span>
        //                         {new Date(task.startDate).toLocaleDateString()}
        //                     </p>
        //                     <p style={{ marginLeft: '5px' }} className={style.description}>
        //                         <span className={style.description}>End Date:-</span>
        //                         {new Date(task.endDate).toLocaleDateString()}
        //                     </p>
        //                     <p style={{ marginLeft: '5px' }} className={style.asiigndby}>
        //                         <span className={style.asiigndby}>Assigned By:-</span>
        //                         {task?.admin?.name}
        //                     </p>
        //                     <button onClick={(e) => {
        //                         e.preventDefault();
        //                         handelComplete(task.id)
        //                     }} className={style.completedbtn} >Mark as Completed</button>

        //                     <button style={{ marginTop: "5px" }} onClick={(e) => {
        //                         e.preventDefault()
        //                         handelPeading(task.id)
        //                     }} className={style.pendingbtn} >Back To pending</button>
        //                 </div>
        //             </li>
        //         ))}
        //     </ul>
        // </>
        <>
            <div style={{ display: 'flex', justifyContent: 'space-evenly', marginBottom: "30px" }} className={style.filters}>
                <select className={`${style.select}`} value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                    <option value="all">All</option>
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                    <option value="overdue">Overdue</option>
                </select>
                <input
                    type="date"
                    value={startDateFilter}
                    onChange={(e) => setStartDateFilter(e.target.value)}
                    placeholder="Start Date"
                    className={`${style.select}`}
                />
                <input
                    type="date"
                    value={endDateFilter}
                    onChange={(e) => setEndDateFilter(e.target.value)}
                    placeholder="End Date"
                    className={`${style.select}`}
                />
            </div>
            <ul style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
                {filteredTasks.map(task => (
                    <li key={task.id} style={{ listStyle: 'none', marginBottom: '10px' }}>
                        <div style={{ padding: "10px 5px" }} className={`${style.card} ${style['card-1']}`}>
                            <p style={{ marginLeft: '5px' }} className={style.taskname}>Task: {task.taskName}</p>
                            <p style={{ marginLeft: '5px' }} className={style.description}>Description: {task.description}</p>
                            <p style={{ marginLeft: '5px' }}
                                className={`${task.status === 'completed'
                                    ? style.completed : new Date(task.endDate).toDateString() === new Date().toDateString() && task.status !== 'completed'
                                        ? style.dueToday
                                        : new Date(task.endDate) < new Date() && task.status !== 'completed'
                                            ? style.overdue
                                            : new Date(task.endDate) > new Date() && task.status !== 'completed'
                                                ? style.pending
                                                : ''}`}
                            >
                                <span className={style.description}>Status: </span>
                                {new Date(task.endDate).toISOString() < new Date().toISOString() && new Date(task.endDate).toDateString() !== new Date().toDateString() && task.status !== 'completed' ? "overdue" : task.status}
                                {/* {
                                    new Date(task.endDate).toDateString() > new Date().toDateString() && task.status !== 'completed' ? "overdue" : task.status
                                } */}
                            </p>
                            <p style={{ marginLeft: '5px' }} className={style.description}>
                                <span className={style.description}>Start Date: </span>
                                {new Date(task.startDate).toLocaleDateString()}
                            </p>
                            <p style={{ marginLeft: '5px' }} className={style.description}>
                                <span className={style.description}>End Date: </span>
                                {new Date(task.endDate).toLocaleDateString()}
                            </p>
                            <p style={{ marginLeft: '5px' }} className={style.asiigndby}>
                                <span className={style.asiigndby}>Assigned By: </span>
                                {task?.admin?.name}
                            </p>
                            <button onClick={(e) => {
                                e.preventDefault();
                                handelComplete(task.id);
                            }} className={style.completedbtn} >Mark as Completed</button>

                            <button style={{ marginTop: "5px" }} onClick={(e) => {
                                e.preventDefault();
                                handelPeading(task.id);
                            }} className={style.pendingbtn} >Back To Pending</button>
                        </div>
                    </li>
                ))}
            </ul>
            <footer>
                <div id="app" class="container">
                    <ul class="page">
                        <li style={{ cursor: 'pointer' }} onClick={goToNextStape}><li>&larr;</li></li>
                        {
                            pageNumber &&
                            Array.from({ length: pageNumber < 5 ? pageNumber : 5 }, (_, i) => {
                                const page = i + 1;
                                return (
                                    <>
                                        {/* <li onClick={() => setStep(page)} className="page__numbers " key={i}>{i + 1}</li> */}
                                        <li style={{ padding: "5px" }} onClick={() => setStep(page)} className={page === step ? "active" : "page__numbers"} key={i}>{i + 1}</li>
                                    </>
                                )
                            })
                        }
                        <li style={{ cursor: 'pointer' }} onClick={goToPriviousStep}><li>&rarr;</li></li>
                    </ul>
                </div>
            </footer>
        </>
    )
}
export default Usertask