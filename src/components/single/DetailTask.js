import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { removeUser } from "../../redux/UserReducer"

const DetailTask = ({ taskId }) => {
  const [task, setTask] = useState(false)
  const user = useSelector(state => state.user.value)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user && user.jwtToken) {
      fetch("http://localhost:5000/api/task/" + taskId, {
        headers: {
          Authorization: "Bearer " + user.jwtToken,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => setTask(data.payload))
    } else {
      dispatch(removeUser())
    }
  }, [user, dispatch, taskId])

  return (
    <div className="col mt-4">
      <div className="col">Logs:</div>
      {task &&
        task.logs.map((log, i) => (
          <div className="col" key={i}>
            {log.action}: {log.userName} - {log.date}
          </div>
        ))}
    </div>
  )
}

export default DetailTask
