import { configureStore } from "@reduxjs/toolkit"

import RefreshReducer from "./RefreshReducer"
import UserReducer from "./UserReducer"
import TaskReducer from "./TaskReducer"
import FilterReducer from "./FilterReducer"

export default configureStore({
  reducer: {
    user: UserReducer,
    refresh: RefreshReducer,
    tasks: TaskReducer,
    filter: FilterReducer
  }
})
