import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { getAllTasksFetch } from "../../redux/TaskReducer"
import List from "./List"

const AllTasksList = () => {
  const [checked, setChecked] = useState([0, 1, 2])
  const allTask = useSelector(state => state.tasks.allTask)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllTasksFetch())
  }, [dispatch])

  return (
    <div className="col">
      <div className="col fs-4 fw-bold">All Tasks</div>
      <div className="col mt-2" style={{ fontSize: "14px" }}>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="pendingCheckbox"
            value={0}
            defaultChecked={checked.includes(0)}
            onChange={e => {
              if (checked.includes(parseInt(e.target.value))) {
                setChecked([...checked.filter(i => i !== parseInt(e.target.value))])
              } else {
                setChecked([...checked, parseInt(e.target.value)])
              }
            }}
          />
          <label className="form-check-label" htmlFor="pendingCheckbox">
            Pending
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="complatedCheckbox"
            value={1}
            defaultChecked={checked.includes(1)}
            onChange={e => {
              if (checked.includes(parseInt(e.target.value))) {
                setChecked([...checked.filter(i => i !== parseInt(e.target.value))])
              } else {
                setChecked([...checked, parseInt(e.target.value)])
              }
            }}
          />
          <label className="form-check-label" htmlFor="complatedCheckbox">
            Complated
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="checkbox"
            id="rejectedCheckbox"
            value={2}
            defaultChecked={checked.includes(2)}
            onChange={e => {
              if (checked.includes(parseInt(e.target.value))) {
                setChecked([...checked.filter(i => i !== parseInt(e.target.value))])
              } else {
                setChecked([...checked, parseInt(e.target.value)])
              }
            }}
          />
          <label className="form-check-label" htmlFor="rejectedCheckbox">
            Rejected
          </label>
        </div>
      </div>
      {allTask && allTask.length > 0 ? <List data={allTask} /> : <div className="col text-center my-3 fst-italic">Tasks not found.</div>}
    </div>
  )
}

export default AllTasksList
