import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

import Login from "./components/Login"
import Main from "./components/Main"
import { setUser } from "./redux/UserReducer"

import AllTasksList from "./components/lists/AllTasksList"
import MyTasksList from "./components/lists/MyTasksList"
import DepTasksList from "./components/lists/DepTasksList"
import CreateTask from "./components/CreateTask"

function App() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user.value)
  const userData = localStorage.getItem("userData")

  if (!user && userData) {
    dispatch(setUser(JSON.parse(userData)))
  }

  if (user) {
    axios.defaults.headers.common["Authorization"] = "Bearer " + user.jwtToken
  }

  return (
    <div style={{ minHeight: "100vh" }}>
      <Routes>
        <Route path="/" element={user ? <Main /> : <Navigate to="login" />}>
          <Route index element={<AllTasksList />} />
          <Route path="mytasks" element={<MyTasksList />} />
          <Route path="deptasks" element={<DepTasksList />} />
          <Route path="addtask" element={<CreateTask />}>
            <Route path=":taskId" element={<CreateTask />} />
          </Route>
        </Route>
        <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </div>
  )
}

export default App
