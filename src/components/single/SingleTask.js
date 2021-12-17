import DetailTask from "./DetailTask"

const SingleTask = ({ task }) => {
  const taskStatus = ["Pending", "Completed", "Rejected"]
  const departments = ["Human Resources Department", "Sales Department", "Marketing Department"]

  return (
    <div className="col mt-4 bg-white rounded-3 border shadow-sm p-2 align-items-center">
      <div type="button" className="row align-items-center" data-bs-toggle="collapse" data-bs-target={`#id${task.id}`} aria-expanded="false" data-bs-parent="#myGroup">
        <div className="col text-center" style={{ maxWidth: "90px" }}>
          <span className={task.status === 0 ? "badge rounded-pill bg-warning text-dark" : task.status === 1 ? "badge rounded-pill bg-success" : "badge rounded-pill bg-danger"}>{taskStatus[task.status]}</span>
        </div>
        <div className="col">
          <div className="col text-secondary fst-italic" style={{ fontSize: "12px" }}>
            title
          </div>
          <div className="col">{task.title}</div>
        </div>
        <div className="col">
          <div className="col text-secondary fst-italic" style={{ fontSize: "12px" }}>
            assigned
          </div>
          <div className="col">{departments[task.assignedDepartment - 1]}</div>
        </div>
        <div className="col d-none d-sm-none d-md-none d-lg-block">
          <div className="col text-secondary fst-italic" style={{ fontSize: "12px" }}>
            created
          </div>
          <div className="col">{task.user.name}</div>
        </div>
      </div>
      <div className="col">
        <div className="collapse" id={`id${task.id}`}>
          <DetailTask taskId={task.id} />
        </div>
      </div>
    </div>
  )
}

export default SingleTask
