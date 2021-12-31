import { configureStore } from "@reduxjs/toolkit"

import RefreshReducer from "./RefreshReducer"
import UserReducer from "./UserReducer"
import TaskReducer from "./TaskReducer"

export default configureStore({
  reducer: {
    user: UserReducer,
    refresh: RefreshReducer,
    tasks: TaskReducer
  }
})
