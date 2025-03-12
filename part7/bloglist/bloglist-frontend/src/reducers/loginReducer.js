import { createSlice } from "@reduxjs/toolkit";

const loginReducer = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser: (state, action) => {
            return action.payload
        }
    }
})

export const setUserData = (user) => {
    return async dispatch => {
        dispatch(setUser(user))
    }
}

export const { setUser } = loginReducer.actions
export default loginReducer.reducer