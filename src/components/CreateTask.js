import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams, useNavigate } from "react-router-dom"

const CreateTask = () => {
  const user = useSelector(state => state.user.value)
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  let taskId = useParams().taskId

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
    }
  }, [taskId])

  const createTaskFormHandler = async e => {
    e.preventDefault()

    console.log(typeof e.target.assignedDepartmentInput.value)

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
          assignedDepartment: parseInt(e.target.assignedDepartmentInput.value)
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
      <form className="col-lg-7 col-md-10 col-sm mx-auto" onSubmit={createTaskFormHandler}>
        <div className="mb-3 row">
          <label htmlFor="titleInput" className="col-sm-1 col-form-label text-secondary fst-italic">
            title:
          </label>
          <div className="col-sm">
            <input type="text" className="form-control" id="titleInput" defaultValue={task ? task.title : ""} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="descriptionInput" className="col-sm-1 col-form-label text-secondary fst-italic">
            desc.:
          </label>
          <div className="col-sm">
            <textarea type="text" className="form-control" id="descriptionInput" defaultValue={task ? task.description : ""} />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="descriptionInput" className="col-sm-1 col-form-label text-secondary fst-italic">
            to:
          </label>
          <div className="col-sm-auto mb-3">
            <select className="form-select" aria-label="Default select example" id="assignedDepartmentInput" value={task && task.assignedDepartment} style={{ pointerEvents: task && "none", color: task && "grey" }}>
              <option value={0}>Select a department</option>
              <option value={1}>Human Resources</option>
              <option value={2}>Sales</option>
              <option value={3}>Marketing</option>
            </select>
          </div>
          <div className="col text-end">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateTask
