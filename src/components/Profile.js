import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { removeUser } from "../redux/UserReducer"

const Profile = () => {
  const user = useSelector(state => state.user.value)
  const [userDetail, setUserDetail] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (user && user.jwtToken) {
      fetch("http://localhost:5000/api/auth/me", {
        headers: {
          Authorization: "Bearer " + user.jwtToken,
          "Content-Type": "application/json"
        }
      })
        .then(response => response.json())
        .then(data => setUserDetail(data.payload))
    } else {
      dispatch(removeUser())
    }
  }, [user, dispatch])

  return (
    <div className="col">
      {userDetail && (
        <div className="row align-items-center">
          <div className="col-auto">
            <Link to="mytasks">
              <i className="bi bi-person-circle fs-1"></i>
            </Link>
          </div>
          <div className="col-auto">
            <div className="col-auto">
              <Link to="mytasks">Hi, {userDetail.name}</Link>
              <i
                type="button"
                className="bi bi-box-arrow-right ms-2 text-danger"
                onClick={() => {
                  localStorage.removeItem("userData")
                  dispatch(removeUser())
                }}
              ></i>
            </div>
            <div className="col-auto" style={{ fontSize: "14px" }}>
              <Link to="mytasks"> {userDetail.title}</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
