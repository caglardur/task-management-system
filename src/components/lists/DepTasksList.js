import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { removeUser } from "../../redux/UserReducer"
import List from "./List"

const DepTasksList = () => {
  const [depTasks, setDepTasks] = useState(null)
  const user = useSelector(state => state.user.value)
  const refresh = useSelector(state => state.refresh.value)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user && user.jwtToken) {
      fetch("http://localhost:5000/api/task/pendings", {
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
        .then(data => setDepTasks(data.payload))
    } else {
      dispatch(removeUser())
    }
  }, [user, refresh, dispatch])

  return (
    <div className="col">
      <div className="col fs-4 fw-bold">Department Tasks</div>
      {depTasks && depTasks.length > 0 ? <List data={depTasks} /> : <div className="col text-center my-3 fst-italic">Tasks not found.</div>}
    </div>
  )
}

export default DepTasksList
