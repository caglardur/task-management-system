import { useState } from "react"
import DetailTask from "./DetailTask"

const SingleTask = ({ task }) => {
  const [showDetail, setShowDetail] = useState(false)
  const taskStatus = ["Pending", "Completed", "Rejected"]
  const depertures = ["İnsan Kaynakları Departmanı", "Satış Departmanı", "Pazarlama Departmanı"]

  return (
    <div className="col mt-4">
      <div className="col">Title: {task.title}</div>
      <div className="col">Description: {task.description}</div>
      <div className="col">Status: {taskStatus[task.status]}</div>
      <div className="col">Assigned Department: {depertures[task.assignedDepartment - 1]}</div>
      <div className="col">Creator: {task.user.name}</div>
      <button type="button" className="btn btn-sm btn-primary" onClick={() => setShowDetail(!showDetail)}>
        Detail
      </button>
      {showDetail && <DetailTask taskId={task.id} />}
    </div>
  )
}

export default SingleTask
