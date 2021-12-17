import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { removeUser } from "../../redux/UserReducer"
import { refresh } from "../../redux/RefreshReducer"
import TaskLog from "./TaskLogs"

const DetailTask = ({ taskId }) => {
  const user = useSelector(state => state.user.value)
  const dispatch = useDispatch()
  const [task, setTask] = useState(false)
  const [responsive, setResponsive] = useState(false)
  const [responseButton, setResponseButton] = useState(false)
  const [editable, setEditable] = useState(false)

  useEffect(() => {
    if (user && task) {
      if (task.status === 0) {
        setResponsive(true)
      } else {
        setResponsive(false)
      }
      if (user.department === task.assignedDepartment) {
        setResponseButton(true)
      } else {
        setResponseButton(false)
      }
      if (user.id === task.user.id) {
        setEditable(true)
      } else {
        setEditable(false)
      }
    }
  }, [user, task])

  useEffect(() => {
    if (user && user.jwtToken) {
      fetch("http://localhost:5000/api/task/" + taskId, {
        headers: {
          Authorization: "Bearer " + user.jwtToken,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => setTask({ ...data.payload }))
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
        .then(() => {
          setResponsive(false)
          dispatch(refresh())
        })
    } catch (err) {
      console.log(err)
    }
  }

  const rejectTaskHandler = () => {
    try {
      fetch("http://localhost:5000/api/task/reject/" + taskId, {
        headers: {
          Authorization: "Bearer " + user.jwtToken,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(() => {
          setResponsive(false)
          dispatch(refresh())
        })
    } catch (err) {
      console.log(err)
    }
  }

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
      <div className="row p-3 d-flex justify-content-between">
        <div className="col">
          <div className="row">
            {editable && (
              <div className="col-auto">
                <Link to={`/addtask/${taskId}`}>
                  <button type="button" className="btn btn-sm btn-outline-primary bg-gradient">
                    Edit
                  </button>
                </Link>
              </div>
            )}
            {editable && (
              <div className="col-auto">
                <button type="button" className="btn btn-sm btn-danger bg-gradient" onClick={deleteTaskHandler}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="col">
          {responsive && (
            <div className="row float-end">
              {responseButton && (
                <div className="col-auto">
                  <button type="button" className="btn btn-sm btn-success bg-gradient" onClick={complateTaskHandler}>
                    Complate
                  </button>
                </div>
              )}
              {responseButton && (
                <div className="col-auto">
                  <button type="button" className="btn btn-sm btn-danger bg-gradient" onClick={rejectTaskHandler}>
                    Reject
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DetailTask
