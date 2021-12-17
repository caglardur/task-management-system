import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

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
            <i className="bi bi-person-circle fs-1"></i>
          </div>
          <div className="col-auto">
            <div className="col-auto">
              Hi, {userDetail.name}
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
              {userDetail.title}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
