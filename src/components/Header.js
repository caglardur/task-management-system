import { Link } from "react-router-dom"
import Profile from "./Profile"

const Header = () => {
  return (
    <div className="col">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid ">
          <Profile />
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close" />
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end align-items-center flex-grow-1">
                <li className="nav-item">
                  <Link to="/">
                    <div type="button" className="nav-link" data-bs-dismiss="offcanvas">
                      All Tasks
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="deptasks">
                    <div type="button" className="nav-link" data-bs-dismiss="offcanvas">
                      Department Tasks
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="mytasks">
                    <div type="button" className="nav-link" data-bs-dismiss="offcanvas">
                      My Tasks
                    </div>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="addtask">
                    <button type="button" className="btn btn-sm btn-primary bg-gradient" data-bs-dismiss="offcanvas">
                      Add Task
                    </button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
