import React from 'react'
import UserChart from '../components/UserChart'
import UserTasksCounter from '../components/UserTasksCounter'
function UserHome() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
            <UserChart></UserChart>
            <UserTasksCounter></UserTasksCounter>
        </div>
    )
}
export default UserHome