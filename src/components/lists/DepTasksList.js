import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getDepTasksFetch } from "../../redux/TaskReducer"

import List from "./List"

const DepTasksList = () => {
  const depTask = useSelector(state => state.tasks.depTask)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDepTasksFetch())
  }, [dispatch])

  return (
    <div className="col">
      <div className="col fs-4 fw-bold">Department Tasks</div>
      {depTask && depTask.length > 0 ? <List data={depTask} /> : <div className="col text-center my-3 fst-italic">Tasks not found.</div>}
    </div>
  )
}

export default DepTasksList
