import { useSelector, useDispatch } from "react-redux"

import { removeUser } from "../redux/UserReducer"

const Profile = () => {
  const user = useSelector(state => state.user.value)
  const dispatch = useDispatch()

  return (
    <div className="col">
      <div className="row align-items-center">
        <div className="col-auto">Hi, {user.name}</div>
        <div className="col-auto">
          <button type="button" className="btn btn-sm btn-danger" onClick={() => dispatch(removeUser())}>
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
