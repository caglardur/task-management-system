const TaskLog = ({ log, i }) => {
  const date = new Date(log.date)

  return (
    <div className="row">
      <div className="col-auto">{i + 1}:</div>
      <div className="col-auto">
        {date.toLocaleDateString()} - {date.toLocaleTimeString().slice(0, 5)}
      </div>
      <div className="col">
        {log.action} from {log.userName}
      </div>
    </div>
  )
}

export default TaskLog
