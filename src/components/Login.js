import { useDispatch } from "react-redux"

import { setUser } from "../redux/UserReducer"

const Login = () => {
  const dispatch = useDispatch()

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
        .then(response => {
          if (response.ok) {
            return response.json()
          } else {
            return validationEmail()
          }
        })
        .then(data => {
          localStorage.setItem("userData", JSON.stringify(data.payload))
          return dispatch(setUser(data.payload))
        })
    } catch (err) {
      console.log(err)
    }
  }

  const validationEmail = () => {
    const emailInputValid = document.getElementById("emailInput")
    emailInputValid.classList.add("is-invalid")
  }

  return (
    <div className="col justify-content-center d-flex" style={{ minHeight: "100vh" }}>
      <form className="col-3 m-auto border shadow rounded-3 py-2 px-4 bg-light" onSubmit={loginFormHandler}>
        <div className="col my-3 fs-5 fw-bold">Task Management System</div>
        <div className="col my-3">
          <label htmlFor="emailInput" className="form-label">
            Email:
          </label>
          <input type="email" className="form-control form-control-sm" id="emailInput" required />
          <div className="invalid-feedback">Email address not found</div>
        </div>
        <button type="submit" className="btn btn-sm btn-primary bg-gradient fw-bold mb-3">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
