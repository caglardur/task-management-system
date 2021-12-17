import { Outlet } from "react-router-dom"

import Header from "./Header"
import Footer from "./Footer"

const Main = () => {
  return (
    <div className="col">
      <div className="col bg-light shadow-sm ">
        <div className="container pt-5 pb-1">
          <Header />
        </div>
      </div>
      <div className="container my-5">
        <Outlet />
      </div>
      <div className="container my-5">
        <Footer />
      </div>
    </div>
  )
}

export default Main
