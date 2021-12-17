import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { removeUser } from "../../redux/UserReducer"
import { refresh } from "../../redux/RefreshReducer"
import TaskLog from "./TaskLogs"

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

  const deleteTaskHandler = () => {
    try {
      fetch("http://localhost:5000/api/task/" + taskId, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + user.jwtToken,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(() => dispatch(refresh()))
    } catch (err) {
      console.log(err)
    }
  }

  const complateTaskHandler = () => {
    try {
      fetch("http://localhost:5000/api/task/complete/" + taskId, {
        headers: {
          Authorization: "Bearer " + user.jwtToken,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(() => dispatch(refresh()))
    } catch (err) {
      console.log(err)
    }
  }

  console.log(task)

  return (
    <div className="col">
      <div className="row align-items-center mt-4 ">
        <div className="col text-secondary fst-italic text-end" style={{ fontSize: "12px", maxWidth: "90px" }}>
          description:
        </div>
        <div className="col">{task.description}</div>
      </div>
      <div className="row mt-4">
        <div className="col text-secondary fst-italic text-end" style={{ fontSize: "12px", maxWidth: "90px" }}>
          logs:
        </div>
        <div className="col">
          {task &&
            task.logs.map((log, i) => (
              <div className="col" key={i}>
                <TaskLog log={log} i={i} />
              </div>
            ))}
        </div>
      </div>
      <div className="row p-3">
        {user && task && user.id === task.user.id && (
          <div className="col-auto">
            <Link to={`/addtask/${taskId}`}>
              <button type="button" className="btn btn-sm btn-outline-primary">
                Edit
              </button>
            </Link>
          </div>
        )}
        {user && task && user.id === task.user.id && (
          <div className="col-auto">
            <button type="button" className="btn btn-sm btn-danger" onClick={deleteTaskHandler}>
              Delete
            </button>
          </div>
        )}
        {user && task && user.department === task.assignedDepartment && (
          <div className="col-auto">
            <button type="button" className="btn btn-sm btn-success" onClick={complateTaskHandler}>
              Complated
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default DetailTask
