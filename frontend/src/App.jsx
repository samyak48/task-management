import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Error from './pages/Error'
import AdminBoard from './pages/AdminBoard'
import UserBoard from './pages/UserBoard'
import ProtectedRoute from './components/ProtectedRout'
import AddTask from './pages/AddTask'
import AllTask from './pages/AllTask'
import AdminHome from './pages/AdminHome'
import EditTask from './pages/EditTask'
import Usertask from './pages/Usertask'
import UserHome from './pages/UserHome'
// import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        {/* <Route path='/login' element={<Login />}></Route> */}
        {/* <Route path='/admindashboard' element={<AdminBoard />}></Route>
        <Route path='/userdashboard' element={<UserBoard />}></Route> */}
        <Route path="/admindashboard" element={
          <ProtectedRoute role="admin">
            <AdminBoard />
          </ProtectedRoute>
        }>
          <Route path="addtask" element={<AddTask />} />
          <Route path='alltask' element={<AllTask />}></Route>
          <Route path="edittask" element={<EditTask />}></Route>
          <Route path="" element={<AdminHome />}></Route>
        </Route>
        <Route path="/userdashboard" element={
          <ProtectedRoute role="user">
            <UserBoard />
          </ProtectedRoute>
        } >
          <Route path='alltask' element={<Usertask />}></Route>
          <Route path="" element={<UserHome />}></Route>
        </Route>
        <Route path='*' element={<Error />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App
