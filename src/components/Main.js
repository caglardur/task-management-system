import { Outlet, Link } from "react-router-dom"

import Header from "./Header"
import Footer from "./Footer"

const Main = ({ children }) => {
  console.log(children)
  return (
    <div className="col">
      <div className="col mt-5">
        <Header />
      </div>
      <div className="col ms-3">
        <div className="row">
          <div className="col-auto">
            <div className="col">
              <Link to="/">
                <i className="bi bi-columns-gap"></i> All Tasks
              </Link>
            </div>
            <div className="col">
              <Link to="deptasks">
                <i className="bi bi-building"></i> Department Tasks
              </Link>
            </div>
            <div className="col">
              <Link to="mytasks">
                <i className="bi bi-award"></i> My Tasks
              </Link>
            </div>
            <div className="col">
              <Link to="addtask">Create Task</Link>
            </div>
          </div>
          <div className="col">
            <Outlet />{" "}
          </div>
        </div>
      </div>
      <div className="col ms-3">
        <Footer />
      </div>
    </div>
  )
}

export default Main
