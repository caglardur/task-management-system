import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

import { removeUser } from "../../redux/UserReducer"
import List from "./List"

const AllTasksList = () => {
  const [allTask, setAllTask] = useState(null)
  const [checked, setChecked] = useState([0, 1, 2])
  const user = useSelector(state => state.user.value)
  const refresh = useSelector(state => state.refresh.value)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user && user.jwtToken) {
      fetch("http://localhost:5000/api/task", {
        headers: {
          Authorization: "Bearer " + user.jwtToken,
          "Content-Type": "application/json"
        }
      })
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            return localStorage.removeItem("userData")
          }
        })
        .then(data => setAllTask(data.payload))
    } else {
      dispatch(removeUser())
    }
  }, [user, refresh, dispatch])

  return (
    <div className="col">
      <div className="col fs-4 fw-bold">All Tasks</div>
      <div className="col mt-2" style={{ fontSize: "14px" }}>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="pendingCheckbox" defaultValue={0} checked onChange={() => setChecked()} />
          <label className="form-check-label" htmlFor="pendingCheckbox">
            Pending
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="complatedCheckbox" defaultValue={1} checked />
          <label className="form-check-label" htmlFor="complatedCheckbox">
            Complated
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="checkbox" id="rejectedCheckbox" defaultValue={2} checked />
          <label className="form-check-label" htmlFor="rejectedCheckbox">
            Rejected
          </label>
        </div>
      </div>
      <List data={allTask} />
    </div>
  )
}

export default AllTasksList
