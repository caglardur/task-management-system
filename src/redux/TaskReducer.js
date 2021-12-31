import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

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

export const getAllTasksFetch = () => {
  return async dispatch => {
    const sendRequest = async () => {
      const response = await axios("http://localhost:5000/api/task")

      if (response.status !== 200) {
        console.log(response)
        localStorage.removeItem("userData")
      } else {
        dispatch(setAllTasks(response.data.payload))
      }
    }
    try {
      await sendRequest()
    } catch (err) {
      console.log(err)
    }
  }
}

export const getDepTasksFetch = () => {
  return async dispatch => {
    const sendRequest = async () => {
      const response = await axios("http://localhost:5000/api/task/pendings")

      if (response.status !== 200) {
        console.log(response)
        localStorage.removeItem("userData")
      } else {
        dispatch(setDepTasks(response.data.payload))
      }
    }
    try {
      await sendRequest()
    } catch (err) {
      console.log(err)
    }
  }
}

export const getMyTasksFetch = () => {
  return async dispatch => {
    const sendRequest = async () => {
      const response = await axios("http://localhost:5000/api/task/my-tasks")

      if (response.status !== 200) {
        console.log(response)
        localStorage.removeItem("userData")
      } else {
        dispatch(setMyTasks(response.data.payload))
      }
    }
    try {
      await sendRequest()
    } catch (err) {
      console.log(err)
    }
  }
}

export const { setAllTasks, setDepTasks, setMyTasks } = TaskReducer.actions

export default TaskReducer.reducer
