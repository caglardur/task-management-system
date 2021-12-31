import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getMyTasksFetch } from "../../redux/TaskReducer"

import List from "./List"

const MyTasksList = () => {
  const myTask = useSelector(state => state.tasks.myTask)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMyTasksFetch())
  }, [dispatch])

  return (
    <div className="col">
      <div className="col fs-4 fw-bold">My Tasks</div>
      {myTask && myTask.length > 0 ? <List data={myTask} /> : <div className="col text-center my-3 fst-italic">Tasks not found.</div>}
    </div>
  )
}

export default MyTasksList
