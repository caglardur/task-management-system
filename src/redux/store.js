import { configureStore } from "@reduxjs/toolkit"

import RefreshReducer from "./RefreshReducer"
import UserReducer from "./UserReducer"

export default configureStore({
  reducer: {
    user: UserReducer,
    refresh: RefreshReducer
  }
})
