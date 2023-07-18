export const checkWinner = (board,key) => {
    const rowLength = board.length;
    const columnLength = board[0].length;
  
    // check horizontal
    for( let row = 0 ; row < rowLength ; row++) {
        for( let col = 0 ; col <= columnLength - 3 ; col++ ){
            if(
                board[row][col] === key &&
                board[row][col + 1] === key &&
                board[row][col + 2] === key
            ) {
                return true
            }
        }
    }

    // check vertical
    for( let row = 0 ; row <= rowLength - 3; row++) {
        for( let col = 0 ; col <= columnLength ; col++ ){
            if(
                board[row][col] === key &&
                board[row + 1][col] === key &&
                board[row + 2][col] === key
            ) {
                return true
            }
        }
    }

    // check diagonal top to right and bottom to left
    for( let row = 0 ; row <= rowLength - 3; row++) {
        for( let col = 0 ; col <= columnLength - 3; col++ ){
            if(
                board[row][col] === key &&
                board[row + 1][col + 1] === key &&
                board[row + 2][col + 2] === key
            ) {
                return true
            }
        }
    }

    // check diagonal top to left and bottom to right
    for( let row = 2 ; row < rowLength ; row++) {
        for( let col = 0 ; col <= columnLength - 3; col++ ){
            if(
                board[row][col] === key &&
                board[row - 1][col + 1] === key &&
                board[row - 2][col + 2] === key
            ) {
                return true
            }
        }
    }


    return false;
}

export const createBoard = (r,c) => {
    const arr = [];

    for (let i = 0; i < r; i++) {
        const row = [];
        
        for (let j = 0; j < c; j++) {
            row.push('');
        }
        
        arr.push(row);
    }
    
    return arr;
}

export const checDraw = (board) => {
    const flattened = [...board.flat()]
    return !flattened.includes('')
}