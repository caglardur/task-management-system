import { createSlice } from "@reduxjs/toolkit"

export const UserReducer = createSlice({
  name: "user",
  initialState: {
    value: null
  },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload
    },
    removeUser: state => {
      state.value = null
    }
  }
})

export const { setUser, removeUser } = UserReducer.actions

export default UserReducer.reducer
