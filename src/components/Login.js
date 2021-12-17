import { useEffect } from "react"
import { useDispatch } from "react-redux"

import { setUser } from "../redux/UserReducer"

const Login = () => {
  const dispatch = useDispatch()
  const userData = localStorage.getItem("userData")


  const loginFormHandler = async e => {
    e.preventDefault()

    try {
      await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: e.target.emailInput.value
        }),
        withCredentials: false
      })
        .then(response => response.json())
        .then(data => {
          if (data.code === "validationError") {
            return console.log(data.message)
          } else {
            localStorage.setItem("userData", JSON.stringify(data.payload))
            return dispatch(setUser(data.payload))
          }
        })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="col justify-content-center d-flex" style={{ minHeight: "100vh" }}>
      <form className="col-3 m-auto border shadow rounded-3 py-2 px-4 bg-light" onSubmit={loginFormHandler}>
        <div className="col my-3 fs-5 fw-bold">Task Management System</div>
        <div className="col my-3">
          <label htmlFor="emailInput" className="form-label">
            Email:
          </label>
          <input type="text" className="form-control form-control-sm" id="emailInput" />
        </div>
        <button type="submit" className="btn btn-sm btn-primary bg-gradient fw-bold mb-3">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
