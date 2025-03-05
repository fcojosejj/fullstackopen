import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    setNotification: (state, action) => {
      return action.payload
    }
  }
})

export const changeNotification = (notification, timeout) => {
  return async dispatch => {
    dispatch(setNotification(notification))
    setTimeout(() => {
      dispatch(setNotification(''))
    }, timeout * 1000)
  }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer