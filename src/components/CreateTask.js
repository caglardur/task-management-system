import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"

import { addTaskFetch, editTaskFetch } from "../redux/action/TaskAction"

const CreateTask = () => {
  const user = useSelector(state => state.user.value)
  const dispatch = useDispatch()
  const [task, setTask] = useState(false)
  const [title, setTitle] = useState(null)
  const [description, setDescription] = useState(null)
  const [assignedDepartment, setAssignedDepartment] = useState("1")
  const navigate = useNavigate()

  let taskId = useParams().taskId

  const departments = ["Human Resources Department", "Sales Department", "Marketing Department"]

  useEffect(() => {
    const fetchFunction = async () => {
      if (taskId) {
        const response = await axios("http://localhost:5000/api/task/" + taskId)
        setTask(response.data.payload)
        setTitle(response.data.payload.title)
        setDescription(response.data.payload.description)
      } else {
        setTask(false)
      }
    }
    fetchFunction()
  }, [taskId, user])

  const createTaskFormHandler = async e => {
    e.preventDefault()

    try {
      dispatch(addTaskFetch({ title, description, assignedDepartment }))
    } catch (err) {
      console.log(err)
    }

    navigate("/mytasks")
  }

  const editTaskHandler = e => {
    e.preventDefault()
    console.log("edit")

    try {
      dispatch(editTaskFetch({ title, description, taskId }))
    } catch (err) {
      console.log(err)
    }

    navigate("/mytasks")
  }
  return (
    <div className="col">
      <div className="col text-center fs-5">{task ? "Edit Task" : "Add Task"}</div>
      <form className="col-lg-7 col-md-10 col-sm mx-auto mt-3" onSubmit={task ? editTaskHandler : createTaskFormHandler}>
        <div className="mb-3 row">
          <label htmlFor="titleInput" className="col-sm-1 col-form-label text-secondary fst-italic">
            title:
          </label>
          <div className="col-sm">
            <input type="text" className="form-control" id="titleInput" defaultValue={task ? task.title : ""} required onChange={e => setTitle(e.target.value)} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="descriptionInput" className="col-sm-1 col-form-label text-secondary fst-italic">
            desc.:
          </label>
          <div className="col-sm">
            <textarea type="text" className="form-control" id="descriptionInput" defaultValue={task ? task.description : ""} required onChange={e => setDescription(e.target.value)} />
          </div>
        </div>
        <div className="mb-3 row align-items-center">
          <label htmlFor="descriptionInput" className="col-sm-1 col-form-label text-secondary fst-italic">
            to:
          </label>
          {task ? (
            <div className="col-sm-auto">{departments[task.assignedDepartment - 1]}</div>
          ) : (
            <div className="col-sm-auto">
              <select className="form-select" aria-label="Default select example" id="assignedDepartmentInput" required onChange={e => setAssignedDepartment(e.target.value)}>
                <option value={1}>HR Department</option>
                <option value={2}>Sales Department</option>
                <option value={3}>Marketing Department</option>
              </select>
            </div>
          )}

          <div className="row justify-content-end px-0">
            <div className="col-auto">
              <button type="button" className="btn btn-sm btn-secondary" onClick={() => navigate(-1)}>
                Cancel
              </button>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-sm btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateTask
