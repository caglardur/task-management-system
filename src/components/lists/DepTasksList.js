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
        .then(response => response.json())
        .then(data => setDepTasks(data.payload))
    } else {
      dispatch(removeUser())
    }
  }, [user, refresh, dispatch])

  return (
    <div className="col">
      <div className="col fs-4 fw-bold">Department Tasks</div>
      <List data={depTasks} />
    </div>
  )
}

export default DepTasksList
