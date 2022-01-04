import { createSlice } from "@reduxjs/toolkit"

export const FilterReducer = createSlice({
  name: "filter",
  initialState: {
    value: [0, 1, 2]
  },
  reducers: {
    setFilter: (state, action) => {
      state.value = action.payload
    }
  }
})

export const { setFilter } = FilterReducer.actions

export default FilterReducer.reducer
