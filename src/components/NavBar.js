import { Link } from "react-router-dom"

const NavBar = () => {
  return (
    <div className="col m-5">
      <div className="row">
        <div className="col">
          <div className="col mb-3">
            <Link to="/">
              <i className="bi bi-columns-gap"></i> All Tasks
            </Link>
          </div>
          <div className="col mb-3">
            <Link to="deptasks">
              <i className="bi bi-building"></i> Department Tasks
            </Link>
          </div>
          <div className="col mb-3">
            <Link to="addtask">
              <button type="button" className="btn btn-sm btn-primary bg-gradient">
                Add Task
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavBar
