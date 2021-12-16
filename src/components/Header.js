import Profile from "./Profile"

const Header = () => {
  return (
    <div className="row p-4">
      <div className="col fs-5"> Task Management System</div>
      <div className="col-auto">
        <Profile />
      </div>
    </div>
  )
}

export default Header
