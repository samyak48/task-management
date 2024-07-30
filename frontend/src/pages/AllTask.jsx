import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllTasks } from '../slices/taskslice'
import style from './AllTask.module.css'
import { AiFillDelete } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { fetchUsers } from '../slices/grtalluserslice'
import { deleteTask } from '../slices/taskslice'
import { useNavigate } from 'react-router-dom'
import { fetchStatus } from '../slices/statusslice'
import './Paginate.css'
function AllTask() {
    // useEffect(() => {
    //     async function getAllTasks() {
    //         const responce = await fetch("http://localhost:3005/task/getalltask", {
    //             method: "GET",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "Authorization": `Bearer ${localStorage.getItem("token")}`
    //             }
    //         })
    //         if (responce.ok) {
    //             const data = await responce.json()
    //             console.log(data)
    //         }
    //         else {
    //             const error = await responce.json()
    //             console.log(error)
    //         }
    //     }
    //     getAllTasks()
    // })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const task = useSelector(state => state.tasks)
    const status = useSelector(state => state.status.tasks);
    const totalTask = (status.todayCompletedTasksCount + status.overdueTasksCount + status.pendingTasksCount + status.completedTasksCount) - status.todayCompletedTasksCount
    const itemPerPage = 10
    const pageNumber = totalTask && Math.ceil(totalTask / itemPerPage)

    // console.log(pageNumber)
    // console.log(totalTask)
    // console.log(task)

    const [selectedOption, setSelectedOption] = useState('all');
    const [selectedUser, setSelectedUser] = useState('all');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [step, setStep] = useState(1)
    console.log(step)
    // console.log(typeof (selectedUser))
    useEffect(() => {
        dispatch(fetchAllTasks(step))
        dispatch(fetchStatus())
    }, [dispatch, step])

    // function goToNextStape() {

    //     if (step > 1) {
    //         setStep((step) => step - 1)
    //     }
    // }
    // function goToPriviousStep() {
    //     if (step < pageNumber) {
    //         setStep((step) => step + 1)
    //     }
    // }
    function goToPriviousStep() {

        if (step > 1) {
            setStep((step) => step - 1)
        }
    }
    function goToNextStape() {
        if (step < pageNumber) {
            setStep((step) => step + 1)
        }
    }
    const users = useSelector((state) => state.allusers.users)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])



    const getUserNameById = (id) => {
        const user = users.find(user => user.id === id);
        return user ? user.name : 'Unknown User';
    };

    async function handelDelete(id) {
        console.log(id)
        if (window.confirm('Are you sure you want to delete this task?')) {
            await dispatch(deleteTask(id));
            await dispatch(fetchAllTasks());
        }
        // async function deleteTask(id) {
        //     const responce = await fetch(`http://localhost:3005/task/deletetask/${id}`, {
        //         method: "DELETE",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Authorization": `Bearer ${localStorage.getItem("token")}`
        //         }
        //     })
        //     if (responce.ok) {
        //         const data = await responce.json()
        //         alert("task deleted successfully")
        //         console.log(data)
        //     }
        //     else {
        //         const error = await responce.json()
        //         console.log(error)
        //         alert(error.message)
        //     }
        // }
        // deleteTask(id)
    }
    const filteredTasks = task.tasks.filter(item => {
        const filterByStatus = selectedOption === 'all' || item.status === selectedOption;
        const filterByUser = selectedUser === 'all' || item.assignedUserId === +selectedUser;
        const filterByStartDate = startDate ? new Date(item.startDate).toDateString() >= new Date(startDate).toDateString() : true;
        const filterByEndDate = endDate ? new Date(item.endDate).toDateString() <= new Date(endDate).toDateString() : true;
        // console.log(filterByEndDate, filterByStartDate, filterByStatus, filterByUser)
        return filterByStatus && filterByUser && filterByStartDate && filterByEndDate;
    });

    return (
        <>
            <div style={{ display: 'flex', gap: "25px", marginTop: '30px', marginBottom: "30px" }}>
                <div>
                    <select className={`${style.select}`} value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                        <option value="all">Filter by status</option>
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div>
                    <select className={`${style.select}`} value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                        <option value="all">Filter by user</option>
                        <option value="all">All</option>
                        {users.filter(user => { return user.role === "user" }).map(user => {
                            return (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                    <label htmlFor="startDate">Start Date:</label>
                    <input className={`${style.select}`} id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
                    <label htmlFor="endDate">End Date:</label>
                    <input className={`${style.select}`} id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
            </div>
            <div className={style.tableContainer}>
                <table className={style.table}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Task Name</th>
                            <th style={{ textAlign: 'center' }}>Description</th>
                            <th style={{ textAlign: 'center' }}>Status</th>
                            <th style={{ textAlign: 'center' }}>Start Date</th>
                            <th style={{ textAlign: 'center' }}>End Date</th>
                            <th style={{ textAlign: 'center' }}>Assigned User</th>
                            <th style={{ textAlign: 'center' }}>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map((item) => (
                            <tr key={item.id}>
                                <td>{item.taskName}</td>
                                <td>{item.description}</td>
                                <td style={{ textAlign: 'center' }}
                                    className={`${style.task} ${item.status === 'completed'
                                        ? style.completed
                                        : new Date(item.endDate).toDateString() === new Date().toDateString() && item.status !== 'completed'
                                            ? style.dueToday
                                            : new Date(item.endDate) < new Date() && item.status !== 'completed'
                                                ? style.overdue
                                                : new Date(item.endDate) > new Date() && item.status !== 'completed'
                                                    ? style.pending
                                                    : ''
                                        }`}
                                >
                                    {/* {
                                        new Date(item.endDate).toDateString() < new Date().toDateString() && item.status !== 'completed' ? "overdue" : item.status
                                    } */}
                                    {
                                        new Date(item.endDate).toISOString() < new Date().toISOString() && new Date(item.endDate).toDateString() !== new Date().toDateString() && item.status !== 'completed' ? "overdue" : item.status
                                    }
                                </td>
                                <td style={{ textAlign: 'center' }}>{new Date(item.startDate).toLocaleDateString()}</td>
                                <td style={{ textAlign: 'center' }}>{new Date(item.endDate).toLocaleDateString()}</td>
                                <td style={{ textAlign: 'center' }}>{getUserNameById(item.assignedUserId)}</td>

                                <td style={{ textAlign: 'center' }}><button className={style.deletebtn} onClick={(e) => {
                                    e.preventDefault()
                                    handelDelete(item.id)
                                }
                                }><AiFillDelete />
                                </button>  <button onClick={(e) => {
                                    e.preventDefault()
                                    navigate("/admindashboard/edittask", { state: { task: item } })
                                }} className={style.editbtn}><AiFillEdit /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <footer>
                <div id="app" class="container">
                    <ul class="page">
                        <li style={{ cursor: 'pointer' }} onClick={goToPriviousStep}><li>&larr;</li></li>
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
                        <li style={{ cursor: 'pointer' }} onClick={goToNextStape}><li>&rarr;</li></li>
                    </ul>
                </div>
            </footer>
        </>
    )
}
export default AllTask