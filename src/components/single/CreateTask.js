import { useSelector, useDispatch } from "react-redux"

const CreateTask = () => {
  const user = useSelector(state => state.user.value)
  const dispatch = useDispatch()

  const createTaskFormHandler = async e => {
    e.preventDefault()

    try {
      await fetch("http://localhost:5000/api/task", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + user.jwtToken,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: e.target.titleInput.value,
          description: e.target.descriptionInput.value,
          assignedDepartment: e.target.assignedDepartmentInput.options.selectedIndex
        }),
        withCredentials: false
      })
        .then(response => response.json())
        .then(data => console.log(data))
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <form className="col" onSubmit={createTaskFormHandler}>
      <div className="mb-3">
        <label htmlFor="titleInput" className="form-label">
          Title
        </label>
        <input type="text" className="form-control" id="titleInput" aria-describedby="emailHelp" />
      </div>
      <div className="mb-3">
        <label htmlFor="descriptionInput" className="form-label">
          Description
        </label>
        <input type="text" className="form-control" id="descriptionInput" />
      </div>
      <div className="mb-3">
        <select className="form-select" aria-label="Default select example" id="assignedDepartmentInput">
          <option selected>Assigned Department</option>
          <option value={1}>İnsan Kaynakları Departmanı</option>
          <option value={2}>Satış Departmanı</option>
          <option value={3}>Pazarlama Departmanı</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  )
}

export default CreateTask
