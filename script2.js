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
    let roundWinner;
    
    //horizontal win check
    const horCheck = () => {
        if (gameBoard.boardArr[0][0].textContent !== '' && gameBoard.boardArr[0][0].textContent !== undefined) {
            if (gameBoard.boardArr[0][0].textContent === gameBoard.boardArr[0][1].textContent && gameBoard.boardArr[0][1].textContent === gameBoard.boardArr[0][2].textContent) {
                horizontalWin = true
                roundWinner = gameBoard.boardArr[0][0].textContent;
            }
        } else if (gameBoard.boardArr[1][0].textContent !== '' && gameBoard.boardArr[1][0].textContent !== undefined){
            if (gameBoard.boardArr[1][0].textContent === gameBoard.boardArr[1][1].textContent && gameBoard.boardArr[1][1].textContent === gameBoard.boardArr[1][2].textContent) {
                horizontalWin = true
                roundWinner = gameBoard.boardArr[1][0].textContent;
            }
        } else if (gameBoard.boardArr[2][0].textContent !== '' && gameBoard.boardArr[2][0].textContent !== undefined){
            if (gameBoard.boardArr[2][0].textContent === gameBoard.boardArr[2][1].textContent && gameBoard.boardArr[2][1].textContent === gameBoard.boardArr[2][2].textContent){
                horizontalWin = true
                roundWinner = gameBoard.boardArr[2][0].textContent;
            }
        }

        return horizontalWin;
    }

    //vertical win check
    const verCheck = () => {
        if (gameBoard.boardArr[0][0].textContent !== '' && gameBoard.boardArr[0][0].textContent !== undefined){
            if (gameBoard.boardArr[0][0].textContent === gameBoard.boardArr[1][0].textContent && gameBoard.boardArr[1][0].textContent === gameBoard.boardArr[2][0].textContent){
                verticalWin = true;
                roundWinner = gameBoard.boardArr[0][0].textContent;
            }
        } else if (gameBoard.boardArr[0][1].textContent !== '' && gameBoard.boardArr[0][1].textContent !== undefined){
            if (gameBoard.boardArr[0][1].textContent === gameBoard.boardArr[1][1].textContent && gameBoard.boardArr[1][1].textContent === gameBoard.boardArr[2][1].textContent){
                verticalWin = true;
                roundWinner = gameBoard.boardArr[0][1].textContent;
            }
        } else if (gameBoard.boardArr[0][2].textContent !== '' && gameBoard.boardArr[0][2].textContent !== undefined){
            if (gameBoard.boardArr[0][2].textContent === gameBoard.boardArr[1][2].textContent && gameBoard.boardArr[1][2].textContent === gameBoard.boardArr[2][2].textContent){
                verticalWin = true;
                roundWinner = gameBoard.boardArr[0][2].textContent;
            }
        }

        return verticalWin;

    }

    //diagonal win check
    const diaCheck = () => {
        if (gameBoard.boardArr[1][1].textContent !== '' && gameBoard.boardArr[1][1].textContent !== undefined){
            if ((gameBoard.boardArr[0][0].textContent === gameBoard.boardArr[1][1].textContent && 
                gameBoard.boardArr[1][1].textContent === gameBoard.boardArr[2][2].textContent) || 
                (gameBoard.boardArr[0][2].textContent === gameBoard.boardArr[1][1].textContent && 
                gameBoard.boardArr[2][0].textContent === gameBoard.boardArr[1][1].textContent)){
                diagonalWin = true;
                roundWinner = gameBoard.boardArr[1][1].textContent;
            }
        }

        return diagonalWin;

    }

    //check if there is a winner at all
    //let isWinner = horizontalWin ? true : verticalWin ? true : diagonalWin ? true : false;

    const isWinner = () => {
        let win = false;

        if (horCheck()){ 
            win = true 
        }  else if (verCheck()) { 
            win = true 
        } else if (diaCheck()) { 
            win = true 
        }

        return win;
}

    return {isWinner, roundWinner}
})()


const gameFlow = (() => {
    let currentPlayer = player1;

    const endGame = () => {
        currentPlayer = '';
        player1.played = true;
        player2.played = true;
    }

    return {currentPlayer, endGame}
})()

//display controller
const displayController = (() => {
    
    const displayBoard = document.querySelector('#game-board'); //display version of the game board
    document.querySelector('#curr-player').textContent = `current player: ${gameFlow.currentPlayer}`; //displays the current player
    const playerOneScore = document.querySelector('.player1-score'); //displays player 1's score
    const playerTwoScore = document.querySelector('.player2-score'); //displays player 2's score

    //figure out how to render the board and have it show updates when plays happen
    const renderBoard = (() => {
        displayBoard.appendChild(gameBoard.frame);
    })();

    //add event listeners to cells
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){

            gameBoard.boardArr[i][j].addEventListener('click', (e) => {
                gameFlow.currentPlayer.playSign(e.target);
                
                if (checkWinner.isWinner()){
                    console.log('we have a winner')

                    if (gameFlow.currentPlayer == player1){
                        player1.score += 1;
                        playerOneScore.textContent = gameFlow.currentPlayer.score;
                    }

                    if (currentPlayer == player2){
                        player2.score += 1;
                        playerTwoScore.textContent = gameFlow.currentPlayer.score;
                    }
                    
                    //end game
                    gameFlow.endGame();
                    
                    //display winner
                    displayWinner();
                }

                if (gameFlow.currentPlayer === player1){
                    player1.played = true;
                    player2.played = false;
                    gameFlow.currentPlayer = player2;

                } else if (gameFlow.currentPlayer === player2)  {
                    player2.played = true;
                    player1.played = false;
                    gameFlow.currentPlayer = player1;
                }

                console.log(gameFlow.currentPlayer);
                


            })
        }
    }

    const displayWinner = () => {
        let winDisplay = document.createElement('div');
        winDisplay.setAttribute(id, 'win-display');
        
        let winOverlay = document.createElement('div');
        winOverlay.setAttribute(id, 'win-overlay')
        
        let winMessage = document.createElement('p');
        winMessage.textContent = `${checkWinner.roundWinner} wins the round`;
        
        let restartBtn = document.createElement('button');
        restartBtn.textContent = 'Restart'
        
        let quitBtn = document.createElement('button');
        quitBtn.textContent = 'Quit'

        let btnSet = document.createElement('div');
        btnSet.setAttribute(id, 'winner-btn-set')

        btnSet.appendChild(restartBtn)
        btnSet.appendChild(quitBtn)

        winOverlay.appendChild(btnSet)
        winOverlay.appendChild(winMessage)
        winDisplay.appendChild(winOverlay)

        if (!checkWinner.isWinner()){
            winOverlay.style.display = none;
        }
    }

    return {
        displayBoard,
        renderBoard
    }
    

})();
