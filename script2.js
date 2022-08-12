//player
const player = (sign) => {
    const getSign  = () => {return sign}
    let played = false; // for when someone has just played a move
    let score = 0;
    
    const playSign = (position) => {

        if ((position.innerHTML === '' || position.innerHTML === undefined) && played === false){
            position.innerHTML = getSign();
            //played = true;
        } else {
            return;
        }

        
    }

    return {playSign, played, score}
}

let player1 = player('X');
let player2 = player('O');

//game board
const gameBoard = (()=>{
    let frame = document.createElement('div');
    let boardArr = [[],[],[]];
    
    for (let i = 0; i < 3; i++){
      for (let j = 0; j < 3; j++){
        boardArr[i][j] = document.createElement('div');
        boardArr[i][j].classList.add('cell');
        frame.appendChild(boardArr[i][j]);
        boardArr[i][j].textContent = '';

        }
    }

    frame.setAttribute('id', 'frame');

    return {frame, boardArr}
})()

//win checker
const checkWinner = (() => {

    let horizontalWin = false;
    let verticalWin = false;
    let diagonalWin = false;
    let roundWinner = '';

    const setRoundWinner = (x) => {
        roundWinner = x;
        return x;
    }
    
    //horizontal win check
    const horCheck = () => {
        if (gameBoard.boardArr[0][0].textContent !== '' && gameBoard.boardArr[0][0].textContent !== undefined) {
            if (gameBoard.boardArr[0][0].textContent === gameBoard.boardArr[0][1].textContent && gameBoard.boardArr[0][1].textContent === gameBoard.boardArr[0][2].textContent) {
                setRoundWinner(gameBoard.boardArr[0][0].textContent);
                return true;
            }
        } else if (gameBoard.boardArr[1][0].textContent !== '' && gameBoard.boardArr[1][0].textContent !== undefined){
            if (gameBoard.boardArr[1][0].textContent === gameBoard.boardArr[1][1].textContent && gameBoard.boardArr[1][1].textContent === gameBoard.boardArr[1][2].textContent) {
                setRoundWinner(gameBoard.boardArr[1][0].textContent);
                return true;
            }
        } else if (gameBoard.boardArr[2][0].textContent !== '' && gameBoard.boardArr[2][0].textContent !== undefined){
            if (gameBoard.boardArr[2][0].textContent === gameBoard.boardArr[2][1].textContent && gameBoard.boardArr[2][1].textContent === gameBoard.boardArr[2][2].textContent){
                
                setRoundWinner(roundWinner = gameBoard.boardArr[2][0].textContent);
                return true;
            }
        } else {
            return false;
        }

        //return horizontalWin;
    }

    //vertical win check
    const verCheck = () => {
        if (gameBoard.boardArr[0][0].textContent !== '' && gameBoard.boardArr[0][0].textContent !== undefined){
            if (gameBoard.boardArr[0][0].textContent === gameBoard.boardArr[1][0].textContent && gameBoard.boardArr[1][0].textContent === gameBoard.boardArr[2][0].textContent){
                setRoundWinner(gameBoard.boardArr[0][0].textContent);
                return true;
            }
        } else if (gameBoard.boardArr[0][1].textContent !== '' && gameBoard.boardArr[0][1].textContent !== undefined){
            if (gameBoard.boardArr[0][1].textContent === gameBoard.boardArr[1][1].textContent && gameBoard.boardArr[1][1].textContent === gameBoard.boardArr[2][1].textContent){
                setRoundWinner(gameBoard.boardArr[0][1].textContent);
                return true;
            }
        } else if (gameBoard.boardArr[0][2].textContent !== '' && gameBoard.boardArr[0][2].textContent !== undefined){
            if (gameBoard.boardArr[0][2].textContent === gameBoard.boardArr[1][2].textContent && gameBoard.boardArr[1][2].textContent === gameBoard.boardArr[2][2].textContent){
                setRoundWinner(gameBoard.boardArr[0][2].textContent);
                return true;
            }
        } else {
            return false;
        }

        //return verticalWin;

    }

    //diagonal win check
    const diaCheck = () => {
        if (gameBoard.boardArr[1][1].textContent !== '' && gameBoard.boardArr[1][1].textContent !== undefined){
            if ((gameBoard.boardArr[0][0].textContent === gameBoard.boardArr[1][1].textContent && 
                gameBoard.boardArr[1][1].textContent === gameBoard.boardArr[2][2].textContent) || 
                (gameBoard.boardArr[0][2].textContent === gameBoard.boardArr[1][1].textContent && 
                gameBoard.boardArr[2][0].textContent === gameBoard.boardArr[1][1].textContent)){
                setRoundWinner(gameBoard.boardArr[1][1].textContent);
                return true;
            }   else {
                    return false;
                } 
        }

        //return diagonalWin;

    }

    //check if there is a winner at all
    //let isWinner = horizontalWin ? true : verticalWin ? true : diagonalWin ? true : false;

    const isWinner = () => {
        if (horCheck() || verCheck() || diaCheck()){
            return true;
        } else {
            return false;
        }
         
}

    return {isWinner, setRoundWinner}
})()


const gameFlow = (() => {
    let currentPlayer = player1;
    let currentRound = 1;

    const endGame = () => {
        currentPlayer = '';
        player1.played = true;
        player2.played = true;
    }

    const resetGame = () => {
        for (let i = 0; i<3;i++){
            for (let j=0; j<3; j++){
                gameBoard.boardArr[i][j].textContent = '';
            }
        }
    }

    return {currentPlayer, endGame, resetGame, currentRound}
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

    const play = (e) => {
        e.preventDefault();
        gameFlow.currentPlayer.playSign(e.target)
        
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


    const displayWinOverlay = () => {
            winOverlay.style.display = 'flex';
    }

    resetBtn.addEventListener('click', () => {
        winOverlay.style.display = 'none';
        gameFlow.resetGame();
    })


    //add event listeners to all the cells
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

    return {
        displayBoard,
        renderBoard
    }
    

})();
