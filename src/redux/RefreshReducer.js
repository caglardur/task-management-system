import { createSlice } from "@reduxjs/toolkit"

export const RefreshReducer = createSlice({
  name: "refresh",
  initialState: {
    value: true
  },
  reducers: {
    refresh: state => {
      state.value = !state.value
    }
  }
})

export const { refresh } = RefreshReducer.actions

export default RefreshReducer.reducer
