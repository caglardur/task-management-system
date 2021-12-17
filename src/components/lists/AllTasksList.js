import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { removeUser } from "../../redux/UserReducer"
import List from "./List"

const AllTasksList = () => {
  const [allTask, setAllTask] = useState(null)
  const user = useSelector(state => state.user.value)
  const refresh = useSelector(state => state.refresh.value)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user && user.jwtToken) {
      fetch("http://localhost:5000/api/task", {
        headers: {
          Authorization: "Bearer " + user.jwtToken,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => setAllTask(data.payload))
    } else {
      dispatch(removeUser())
    }
  }, [user, refresh, dispatch])

  return (
    <div className="col">
      <div className="col fs-4 fw-bold">All Tasks</div>
      <List data={allTask} />
    </div>
  )
}

export default AllTasksList
