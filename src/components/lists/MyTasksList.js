import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { removeUser } from "../../redux/UserReducer"
import List from "./List"

const MyTasksList = () => {
  const [myTask, setMyTask] = useState(null)
  const user = useSelector(state => state.user.value)
  const refresh = useSelector(state => state.refresh.value)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user && user.jwtToken) {
      fetch("http://localhost:5000/api/task/my-tasks", {
        headers: {
          Authorization: "Bearer " + user.jwtToken,
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            return localStorage.removeItem("userData")
          }
        })
        .then(data => setMyTask(data.payload))
    } else {
      dispatch(removeUser())
    }
  }, [user, refresh, dispatch])

  return (
    <div className="col">
      <div className="col fs-4 fw-bold">My Tasks</div>
      {myTask && myTask.length > 0 ? <List data={myTask} /> : <div className="col text-center my-3 fst-italic">Tasks not found.</div>}
    </div>
  )
}

export default MyTasksList
