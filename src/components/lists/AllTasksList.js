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
        .then(data => {
          const filteredData = data.payload.filter(task => checked.includes(task.status))
          setAllTask([...filteredData])
        })
    } else {
      dispatch(removeUser())
    }
  }, [user, refresh, dispatch, checked])

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
