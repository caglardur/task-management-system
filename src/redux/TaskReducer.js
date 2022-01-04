import { createSlice } from "@reduxjs/toolkit"

export const TaskReducer = createSlice({
  name: "task",
  initialState: {
    allTask: null,
    depTask: null,
    myTask: null
  },
  reducers: {
    setAllTasks: (state, action) => {
      state.allTask = action.payload
    },
    setDepTasks: (state, action) => {
      state.depTask = action.payload
    },
    setMyTasks: (state, action) => {
      state.myTask = action.payload
    }
  }
})

export const { setAllTasks, setDepTasks, setMyTasks } = TaskReducer.actions

export default TaskReducer.reducer
