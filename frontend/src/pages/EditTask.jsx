import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import style from './EditTask.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../slices/grtalluserslice'
import { updateTask } from '../slices/taskslice'
import toast, { Toaster } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
function EditTask() {
    const location = useLocation()
    const { task } = location.state || {}
    const navigate = useNavigate()

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [taskName, setTaskName] = useState(task.taskName)
    const [description, setDescription] = useState(task.description)
    const [status, setStatus] = useState(task.status)
    const [startDate, setStartDate] = useState(formatDate(task.startDate));
    const [endDate, setEndDate] = useState(formatDate(task.endDate));
    const [assignedUserId, setAssignedUserId] = useState(task.assignedUserId)
    const dispatch = useDispatch()
    const users = useSelector((state) => state.allusers.users)
    useEffect(() => {
        dispatch(fetchUsers())
    }, [dispatch])
    // console.log(users)
    const handelSubmit = async (e) => {
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
            await dispatch(updateTask({
                id: task.id,
                taskName: taskName,
                description: description,
                status: status,
                startDate: startDate,
                endDate: endDate,
                assignedUserId: assignedUserId
            }))
            // toast.success("Task updated successfully")
            // setTaskName("");
            // setDescription("");
            // setStatus("");
            // setStartDate("");
            // setEndDate("");
            // setAssignedUserId("");

            navigate("/admindashboard")
        }
        catch (error) {
            console.log(error)
        }
    }
    // console.log(taskName, description, status, startDate, endDate, assignedUserId)
    return (
        <>
            <Toaster></Toaster>
            <form onSubmit={handelSubmit}>
                <div className={style.form} style={{ margin: "auto" }}>
                    <div className={style.title}>Welcome</div>
                    <div className={style.subtitle}>Let's Edit New Task</div>
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
                            <option value="completed">Completed</option>
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
                    <button type="text" className={style.submit}>Update Task</button>
                </div>
            </form>
        </>
    )
}
export default EditTask