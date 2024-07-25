import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAuthenticated: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true
            state.userData = action.payload
            // state.userData = action.payload.userData
            /* in redux we don't need to spread the values unlike context api*/
        },
        logout: (state, action) => {
            state.isAuthenticated = false
            state.userData = null
        }
    }
})

export const { login, logout } = authSlice.actions;
export default authSlice.reducer