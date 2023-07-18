import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    boardDatas: localStorage.getItem('boardDatas') ? 
    JSON.parse(localStorage.getItem('boardDatas')) : {
        playedBoard: [
            ['','',''],
            ['','',''],
            ['','','']
        ],
        turn: false,
        winner: ''
    }
}

const boardSlice = createSlice({
    name: 'boardDatas',
    initialState,
    reducers: {
        setBoardData: (state, action) => {
            state.boardDatas.playedBoard = action.payload;
            localStorage.setItem('boardDatas', JSON.stringify(state.boardDatas))
        },
        updateBoard: (state, action) => {
            const { rowId, tileId, turn } = action.payload;
            const temp = [...state.boardDatas.playedBoard]

            temp[rowId][tileId] = turn ? 'O' : 'X'

            state.boardDatas.playedBoard = temp;
            state.boardDatas.turn =  !turn;
            localStorage.setItem('boardDatas', JSON.stringify(state.boardDatas))
        },
        clearBoard: (state, action) => {
            state.boardDatas = {
                playedBoard: [
                    ['','',''],
                    ['','',''],
                    ['','','']
                ],
                turn: false
            };
            localStorage.setItem('boardDatas', JSON.stringify(state.boardDatas))
        },
        setWinner: (state, action) => {
            state.boardDatas.winner = action.payload
            localStorage.setItem('boardDatas', JSON.stringify(state.boardDatas))
        },
        resetBoard: (state, action) => {
            state.boardDatas = action.payload
            localStorage.setItem('boardDatas', JSON.stringify(state.boardDatas))
        },
    }
})

export const {
    setBoardData,
    clearBoard,
    updateBoard,
    setWinner,
    resetBoard
} = boardSlice.actions

export default boardSlice.reducer;