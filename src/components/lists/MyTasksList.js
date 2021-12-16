import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { removeUser } from "../../redux/UserReducer"
import SingleTask from "../single/SingleTask"

const MyTasksList = () => {
  const [myTask, setMyTask] = useState(null)
  const user = useSelector(state => state.user.value)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user && user.jwtToken) {
      fetch("http://localhost:5000/api/task/my-tasks", {
        headers: {
          Authorization: "Bearer " + user.jwtToken,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => setMyTask(data.payload))
    } else {
      dispatch(removeUser())
    }
  }, [user, dispatch, myTask])

  return (
    <div className="col">
      {myTask &&
        myTask.map(task => (
          <div className="col" key={task.id}>
            <SingleTask task={task} />
          </div>
        ))}
    </div>
  )
}

export default MyTasksList
