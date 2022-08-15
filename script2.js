//player factory
const player = (sign) => {
    const getSign  = () => {return sign}
    let played = false; // for when someone has just played a move
    let score = 0;
    
    return {getSign, played, score}
}


//players --> to be modified later
let player1 = player('X');
let player2 = player('O');



//game board module
const gameBoard = (()=>{
    let frame = document.createElement('div');
    let boardArr = [[],[],[]];
    
    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++){
        boardArr[i][j] = document.createElement('div');
        boardArr[i][j].classList.add('cell');
        frame.appendChild(boardArr[i][j]);
        boardArr[i][j].textContent = '';

        //add event listeners from the display controller
        let cell = boardArr[i][j];
        cell.addEventListener('click', (e) => {
            if (!checkWinner.isWinner()){
                displayController.play(i,j);
            }

            if (checkWinner.isWinner()){
                displayController.winSequence(e);
            }

            if(checkDraw.isDraw()){
                displayController.drawSequence(e);
            }
        })

        }
    }

    frame.setAttribute('id', 'frame');

    const getCell = (r, c) => {
        return boardArr[r][c].textContent;

    }

    const setCell = (sign, r, c) => {
        if (boardArr[r][c].textContent === '' || boardArr[r][c].textContent === undefined){
            boardArr[r][c].textContent = sign;
        } else {
            return;
        }
    }

    const resetBoard = () => {
        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                boardArr[i][j].textContent = '';
            }
        }
    }

    return {frame, boardArr, getCell, setCell, resetBoard}
})()






//win checking module
const checkWinner = (() => {

    const setRoundWinner = (x) => {
         let roundWinner = x;
        return roundWinner;
    }
    
    //horizontal win check
    const horCheck = () => {
        if (gameBoard.getCell(0,0) !== '' && gameBoard.getCell(0,0) !== undefined){
            if (gameBoard.getCell(0,0) === gameBoard.getCell(0,1) && gameBoard.getCell(0,1) === gameBoard.getCell(0,2)) {
                setRoundWinner(gameBoard.getCell(0,0));
                return true;
            }
        } else if (gameBoard.getCell(1,0) && gameBoard.getCell(1,0) !== undefined){
            if (gameBoard.getCell(1,0) === gameBoard.getCell(1,1) && gameBoard.getCell(1,1) === gameBoard.getCell(1,2)) {
                setRoundWinner(gameBoard.getCell(1,0));
                return true;
            }
        } else if (gameBoard.getCell(2,0) !== '' && gameBoard.getCell(2,0) !== undefined){
            if (gameBoard.getCell(2,0) === gameBoard.getCell(2,1) && gameBoard.getCell(2,1) === gameBoard.getCell(2,2)){
                setRoundWinner(roundWinner = gameBoard.getCell(2,0));
                return true;
            }
        } else {
            return false;
        }
        
    }

    //vertical win check
    const verCheck = () => {
        if (gameBoard.getCell(0,0) && gameBoard.getCell(0,0) !== undefined){
            if (gameBoard.getCell(0,0) === gameBoard.getCell(1,0) && gameBoard.getCell(1,0) === gameBoard.getCell(2,0)){
                setRoundWinner(gameBoard.getCell(0,0));
                return true;
            }
        } else if (gameBoard.getCell(0,1) !== '' && gameBoard.getCell(0,1) !== undefined){
            if (gameBoard.getCell(0,1) === gameBoard.getCell(1,1) && gameBoard.getCell(1,1) === gameBoard.getCell(2,1)){
                setRoundWinner(gameBoard.getCell(0,1));
                return true;
            }
        } else if (gameBoard.getCell(0,2) !== '' && gameBoard.getCell(0,2) !== undefined){
            if (gameBoard.getCell(0,2) === gameBoard.getCell(1,2) && gameBoard.getCell(1,2) === gameBoard.getCell(2,2)){
                setRoundWinner(gameBoard.getCell(0,2));
                return true;
            }
        } else {
            return false;
        }
    }

    //diagonal win check
    const diaCheck = () => {
        if (gameBoard.getCell(1,1) !== '' && gameBoard.getCell(1,1) !== undefined){
            if (gameBoard.getCell(0,0) === gameBoard.getCell(1,1) && gameBoard.getCell(1,1) === gameBoard.getCell(2,2)){
                setRoundWinner(gameBoard.getCell(1,1));
                return true;
            } else if (gameBoard.getCell(0,2) === gameBoard.getCell(1,1) && gameBoard.getCell(1,1) === gameBoard.getCell(2,0)){
                setRoundWinner(gameBoard.getCell(1,1));
                return true;
            } else {
                    return false;
                } 
        }
    }

    //check if there's a winner
    const isWinner = () => {
        if (horCheck() || verCheck() || diaCheck()){
            return true;
        } else {
            return false;
        }
         
}

    return {isWinner, setRoundWinner}
})()

const checkDraw = (() => {

    const checkFull = () => {
        let isFull = false;

        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (gameBoard.getCell(i,j) !== '' && gameBoard.getCell(i,j) !== undefined){
                    isFull = true;
                } else if (gameBoard.getCell(i,j) === '' || gameBoard.getCell(i,j) == undefined){
                    isFull = false;
                }
            }
        }

        return isFull;
    }

    const isDraw = () => {
        if (checkFull()){
            if (checkWinner.isWinner()){
                return false;
            } else {
                return true;
            }
        }
    }

    return {isDraw}

})()


const gameFlow = (() => {
    let currentPlayer = player1;
    let currentRound = 1;

    const endGame = () => {
        //what to do here?
        currentPlayer = '';
        player1.played = true;
        player2.played = true;
    }


    return {currentPlayer, 
        endGame, 
        currentRound
    }
})()

//display controller
const displayController = (() => {
    const resetBtn = document.querySelector('#reset-btn')
    const winOverlay = document.querySelector('#win-overlay');
    const winMessage = document.querySelector('#win-message');
    const displayBoard = document.querySelector('#game-board'); //display version of the game board
    const currPlayer = document.querySelector('#curr-player');
    currPlayer.textContent = `current player: ${gameFlow.currentPlayer}`; //displays the current player -> will change to name later
    const playerOneScore = document.querySelector('.player1-score'); //displays player 1's score
    const playerTwoScore = document.querySelector('.player2-score'); //displays player 2's score

    //figure out how to render the board and have it show updates when plays happen
    const renderBoard = (() => {
        displayBoard.appendChild(gameBoard.frame);
    })();

    const play = (i,j) => {
        //e.preventDefault();
        //gameFlow.currentPlayer.playSign(e.target)
        let sign = gameFlow.currentPlayer.getSign();
        gameBoard.setCell(sign,i,j);

        
        if (!checkWinner.isWinner()){
        if (gameFlow.currentPlayer === player1){
            player1.played = true;
            player2.played = false;
            gameFlow.currentPlayer = player2;
    
        } else if (gameFlow.currentPlayer === player2)  {
            player2.played = true;
            player1.played = false;
            gameFlow.currentPlayer = player1;
        }
    }
    
    }

    const winSequence = (e) => {
        e.preventDefault();
        winMessage.textContent = `${checkWinner.setRoundWinner(e.target.textContent)} wins the game`; //change win message based on the winner
        gameFlow.currentRound +=1; //increment the round count
        displayWinOverlay(); //display win screen
        
        //increment winning player's score
        if (gameFlow.currentPlayer === player1){
            player1.score +=1;
            playerOneScore.textContent = `Player 1 score: ${gameFlow.currentPlayer.score}`;
        } else if (gameFlow.currentPlayer === player2){
            player2.score +=1;
            playerTwoScore.textContent = `Player 2 score: ${gameFlow.currentPlayer.score}`;
        
        }
    }

    const drawSequence = (e) => {
        e.preventDefault();
        winMessage.textContent = `It's a draw, no one wins the game`;
        gameFlow.currentRound +=1;
        displayWinOverlay();

    }


    const displayWinOverlay = () => {
            winOverlay.style.display = 'flex';
    }

    resetBtn.addEventListener('click', () => {
        winOverlay.style.display = 'none';
        gameBoard.resetBoard();
    })


    //add event listeners to all the cells
    /*
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            gameBoard.boardArr[i][j].addEventListener('click', (e) => {
                if (!checkWinner.isWinner()){
                    play(e);
                } 
                
                if (checkWinner.isWinner()){
                    winSequence(e);
                }
            })
        }
    }
    */

    return {
        displayBoard,
        renderBoard,
        play,
        winSequence,
        drawSequence
    }
    

})();
