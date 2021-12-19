import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"

const CreateTask = () => {
  const user = useSelector(state => state.user.value)
  const navigate = useNavigate()
  const [task, setTask] = useState(false)
  let taskId = useParams().taskId

  const departments = ["Human Resources Department", "Sales Department", "Marketing Department"]

  useEffect(() => {
    if (taskId) {
      fetch("http://localhost:5000/api/task/" + taskId, {
        headers: {
          Authorization: "Bearer " + user.jwtToken,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => setTask(data.payload))
    } else {
      setTask(false)
    }
  }, [taskId, user])

  const createTaskFormHandler = async e => {
    e.preventDefault()

    try {
      await fetch(task ? "http://localhost:5000/api/task/" + taskId : "http://localhost:5000/api/task", {
        method: task ? "PUT" : "POST",
        headers: {
          Authorization: "Bearer " + user.jwtToken,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: e.target.titleInput.value,
          description: e.target.descriptionInput.value,
          assignedDepartment: !task ? parseInt(e.target.assignedDepartmentInput.value) : null
        }),
        withCredentials: false
      })
        .then(response => response.json())
        .then(() => navigate("/mytasks"))
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div className="col">
      <div className="col text-center fs-5">{task ? "Edit Task" : "Add Task"}</div>
      <form className="col-lg-7 col-md-10 col-sm mx-auto mt-3" onSubmit={createTaskFormHandler}>
        <div className="mb-3 row">
          <label htmlFor="titleInput" className="col-sm-1 col-form-label text-secondary fst-italic">
            title:
          </label>
          <div className="col-sm">
            <input type="text" className="form-control" id="titleInput" defaultValue={task ? task.title : ""} required />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="descriptionInput" className="col-sm-1 col-form-label text-secondary fst-italic">
            desc.:
          </label>
          <div className="col-sm">
            <textarea type="text" className="form-control" id="descriptionInput" defaultValue={task ? task.description : ""} required />
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
              <select className="form-select" aria-label="Default select example" id="assignedDepartmentInput" required>
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
