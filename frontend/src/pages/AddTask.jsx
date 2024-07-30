import React, { useEffect } from 'react'
import { useState } from 'react'
import style from './AddTask.module.css'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../slices/grtalluserslice'
import { addTask } from '../slices/taskslice'
import { useNavigate } from 'react-router-dom'
function AddTask() {
    const [taskName, setTaskName] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("pending")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [assignedUserId, setAssignedUserId] = useState("")
    const navigate = useNavigate()
    // const [users, setUsers] = useState([])
    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     // console.log(token)
    //     async function getalluser() {
    //         try {
    //             const responce = await fetch("http://localhost:3005/user/alluser", {
    //                 method: "GET",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     "Authorization": `Bearer ${token}`
    //                 }
    //             })
    //             if (responce.ok) {
    //                 const result = await responce.json();
    //                 // console.log(result.users)
    //                 setUsers(result.users)
    //                 // setAssignedUserId(result.data[0].id)
    //             }
    //             else {
    //                 const result = await responce.json();
    //                 toast.error(result.message)
    //             }
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    //     getalluser()
    // }, [])

    const dispatch = useDispatch()
    const users = useSelector((state) => state.allusers.users)
    const task = useSelector((state) => state.tasks.status)
    console.log(task)

    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])
    console.log(users)

    async function handelSubmit(e) {
        e.preventDefault()
        const currentStartDate = new Date(startDate);
        const currentEndDate = new Date(endDate);
        const currentDate = new Date();


        if (currentStartDate < currentDate.setHours(0, 0, 0, 0)) {
            toast.error("Start date cannot be less than the current date");
            return;
        }

        if (currentEndDate < currentStartDate) {
            toast.error("End date cannot be less than the start date");
            return;
        }

        try {
            await dispatch(addTask({
                taskName: taskName,
                description: description,
                status: status,
                startDate: startDate,
                endDate: endDate,
                assignedUserId: assignedUserId
            }));

            setTaskName("");
            setDescription("");
            setStatus("");
            setStartDate("");
            setEndDate("");
            setAssignedUserId("");

            navigate("/admindashboard")
        } catch (err) {
            // Handle any errors
            console.log(err);
            toast.error("Failed to add task");
        }

        // const token = localStorage.getItem('token');
        // try {
        //     const responce = await fetch("http://localhost:3005/task/addtask", {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "Authorization": `Bearer ${token}`
        //         },
        //         body: JSON.stringify({
        //             taskName: taskName,
        //             description: description,
        //             status: status,
        //             startDate: startDate,
        //             endDate: endDate,
        //             assignedUserId: assignedUserId
        //         })
        //     })
        //     if (responce.ok) {
        //         const result = await responce.json();
        //         toast.success("Task added successfully")
        //         setTaskName("")
        //         setDescription("")
        //         setStatus("")
        //         setStartDate("")
        //         setEndDate("")
        //         setAssignedUserId("")
        //     }
        //     else {
        //         const result = await responce.json();
        //         toast.error(result.message)
        //         setTaskName("")
        //         setDescription("")
        //         setStatus("")
        //         setStartDate("")
        //         setEndDate("")
        //         setAssignedUserId("")
        //     }
        // } catch (err) {
        //     console.log(err)
        // }
    }

    return (
        <>
            <Toaster></Toaster>
            <form onSubmit={handelSubmit}>
                <div className={style.form} style={{ margin: "auto" }}>
                    <div className={style.title}>Welcome</div>
                    <div className={style.subtitle}>Let's Add New Task</div>
                    <div className={`${style.inputContainer} ${style.ic2}`}>
                        <input id="taskName" className={style.input} type="text" name='taskName' placeholder="Task Name" required={true} value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                    </div>
                    <div className={`${style.inputContainer} ${style.ic2}`}>
                        <input id="description" className={style.input} type="text" name='description' placeholder="Description" required={true} value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className={`${style.inputContainer} ${style.ic2}`}>
                        {/* <input id="status" className={style.input} type="text" name='status' placeholder="Status" required={true} value={status} onChange={(e) => setStatus(e.target.value)} /> */}
                        <select
                            id="status"
                            className={style.input}
                            name='status'
                            required
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                    <div className={`${style.inputContainer} ${style.ic2}`}>
                        <input id="startDate" className={style.input} type="date" name='startDate' placeholder="startDate" required={true} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                    <div className={`${style.inputContainer} ${style.ic2}`}>
                        <input id="endDate" className={style.input} type="date" name='endDate' placeholder="endDate" required={true} value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                    <div className={`${style.inputContainer} ${style.ic2}`}>
                        {/* <input id="assignedUserId" className={style.input} type="number" name='assignedUserId' placeholder="assignedUserId" required={true} value={assignedUserId} onChange={(e) => setAssignedUserId(e.target.value)} /> */}
                        <select
                            id="assignedUserId"
                            className={style.input}
                            name='assignedUserId'
                            required
                            value={assignedUserId}
                            onChange={(e) => setAssignedUserId(e.target.value)}
                        >
                            <option value="" disabled>Select User</option>
                            {users.filter(user => user.role === "user").map(user => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="text" className={style.submit}>Add Task</button>
                </div>
            </form>
        </>
    )
}
export default AddTask