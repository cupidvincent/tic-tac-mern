import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    gameInfo: localStorage.getItem('gameInfo') ? 
    JSON.parse(localStorage.getItem('gameInfo')) :
    null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setGameInfos: (state, action) => {
            state.gameInfo = action.payload;
            localStorage.setItem('gameInfo', JSON.stringify(action.payload))
        },
        endgame: (state, action) => {
            state.gameInfo = null;
            localStorage.removeItem('gameInfo')
        }
    }
})

export const {
    setGameInfos,
    endgame
} = authSlice.actions

export default authSlice.reducer;