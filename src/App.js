import { Routes, Route, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"

import Login from "./components/Login"
import Main from "./components/Main"

import AllTasksList from "./components/lists/AllTasksList"
import MyTasksList from "./components/lists/MyTasksList"
import DepTasksList from "./components/lists/DepTasksList"
import CreateTask from "./components/single/CreateTask"

function App() {
  const user = useSelector(state => state.user.value)

  return (
    <div className="container" style={{ minHeight: "100vh" }}>
      <Routes>
        <Route path="/" element={user ? <Main /> : <Navigate to="login" />}>
          <Route index element={<AllTasksList />} />
          <Route path="mytasks" element={<MyTasksList />} />
          <Route path="deptasks" element={<DepTasksList />} />
          <Route path="addtask" element={<CreateTask />} />
        </Route>
        <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
      </Routes>
    </div>
  )
}

export default App
