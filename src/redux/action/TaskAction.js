import axios from "axios"
import { useSelector } from "react-redux"

import { setAllTasks, setDepTasks, setMyTasks } from "../TaskReducer"
import { removeUser } from "../UserReducer"

export const getAllTasksFetch = () => {
  return async dispatch => {
    const sendRequest = async () => {
      const response = await axios("http://localhost:5000/api/task")

      if (response.status !== 200) {
        localStorage.removeItem("userData")
        dispatch(removeUser())
      } else {
        const allTasksFilter = response.data.payload.filter(task => checked.includes(task.status))
        dispatch(setAllTasks(allTasksFilter))
      }
    }
    const checked = useSelector(state => state.filter.value)
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
        localStorage.removeItem("userData")
        dispatch(removeUser())
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
        localStorage.removeItem("userData")
        dispatch(removeUser())
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

export const addTaskFetch = ({ title, description, assignedDepartment }) => {
  return async dispatch => {
    const sendRequest = async () => {
      const response = await axios.post("http://localhost:5000/api/task/", {
        title,
        description,
        assignedDepartment
      })

      if (response.status === 200) {
        dispatch(getMyTasksFetch())
        dispatch(getDepTasksFetch())
        dispatch(getAllTasksFetch())
      }
    }
    try {
      await sendRequest()
    } catch (err) {
      console.log(err)
    }
  }
}

export const editTaskFetch = ({ title, description, taskId }) => {
  return async dispatch => {
    const sendRequest = async () => {
      const response = await axios.put("http://localhost:5000/api/task/" + taskId, {
        title,
        description
      })

      if (response.status === 200) {
        dispatch(getMyTasksFetch())
        dispatch(getDepTasksFetch())
        dispatch(getAllTasksFetch())
      }
    }
    try {
      await sendRequest()
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteTaskFetch = ({ taskId }) => {
  return async dispatch => {
    const sendRequest = async () => {
      const response = await axios.delete("http://localhost:5000/api/task/" + taskId)

      if (response.status === 200) {
        dispatch(getMyTasksFetch())
        dispatch(getDepTasksFetch())
        dispatch(getAllTasksFetch())
        console.log("burada")
      } else {
        console.log(response)
      }
    }

    try {
      await sendRequest()
    } catch (err) {
      console.log(err)
    }
  }
}
