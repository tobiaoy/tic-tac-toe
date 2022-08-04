//there are exactly two players  -> factory
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

//create two players
let player1 = player('X');
let player2 = player('O');

//there needs to be logic to control the flow of the game, only needs one iteration -> module
const gameController = (() => {
    let currentPlayer = player1; //for when the game is waiting for a player to play
    
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
  
    
    //winner check
    const checkWinner = (() => {
    let roundWinner;

    let horizontalWin = false;
    let verticalWin = false;
    let diagonalWin = false;
    
    //horizontal win check
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if(gameBoard.boardArr[i][j].textContent !== '' && gameBoard.boardArr[1][1].textContent !== undefined){
                if (gameBoard.boardArr[i][j].textContent === gameBoard.boardArr[i][j+1].textContent && 
                    gameBoard.boardArr[i][j].textContent === gameBoard.boardArr[i][j+2].textContent)
                    horizontalWin = true;
                    roundWinner = gameBoard.boardArr[i][j].textContent;
            }
        }
    }

    //vertical win check
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){
            if(gameBoard.boardArr[i][j].textContent !== '' && gameBoard.boardArr[1][1].textContent !== undefined){
                if (gameBoard.boardArr[i][j].textContent === gameBoard.boardArr[i+1][j].textContent && 
                    gameBoard.boardArr[i][j].textContent === gameBoard.boardArr[i+2][j].textContent)
                    verticalWin = true;
                    roundWinner = gameBoard.boardArr[i][j].textContent;
            }
        }
    }

    //diagonal win check
    if (gameBoard.boardArr[1][1].textContent !== '' && gameBoard.boardArr[1][1].textContent !== undefined){
        if ((gameBoard.boardArr[0][0].textContent === gameBoard.boardArr[1][1].textContent && 
            gameBoard.boardArr[1][1].textContent === gameBoard.boardArr[2][2].textContent) || 
            (gameBoard.boardArr[0][2].textContent === gameBoard.boardArr[1][1].textContent && 
            gameBoard.boardArr[2][0].textContent === gameBoard.boardArr[1][1].textContent)){
            diagonalWin = true;
            roundWinner = gameBoard[1][1].textContent;
        }
    }

    //check if there is a winner at all
    let isWinner = horizontalWin ? true : verticalWin ? true : diagonalWin ? true : false;

    return {isWinner, roundWinner}
})()

    //turns -> to be changed after the click has happened
    /*
        if (player1.played === true && player2.played === false){
            currentPlayer = player2;
        }
    
        if (player2.played === true && player1.played === false){
            currentPlayer = player1;
        } */
    
    
        function endGame(){
            player1.played = true;
            player2.played = true;
            currentPlayer = '';
        }


    return {
        gameBoard,
        endGame,
        currentPlayer,
        checkWinner

    }

})();

//display controller
const displayController = (() => {
    
    const displayBoard = document.querySelector('#game-board'); //display version of the game board
    document.querySelector('#curr-player').textContent = `current player: ${gameController.currentPlayer}`; //displays the current player
    const playerOneScore = document.querySelector('.player1-score'); //displays player 1's score
    const playerTwoScore = document.querySelector('.player2-score'); //displays player 2's score

    //figure out how to render the board and have it show updates when plays happen
    const renderBoard = (() => {
        displayBoard.appendChild(gameController.gameBoard.frame);
    })();

    //add event listeners to cells
    for (let i = 0; i < 3; i++){
        for (let j = 0; j < 3; j++){

            gameController.gameBoard.boardArr[i][j].addEventListener('click', (e) => {
                gameController.currentPlayer.playSign(e.target);
                

                if (gameController.currentPlayer === player1){
                    player1.played = true;
                    player2.played = false;
                    gameController.currentPlayer = player2;

                } else if (gameController.currentPlayer === player2)  {
                    player2.played = true;
                    player1.played = false;
                    gameController.currentPlayer = player1;
                }

                console.log(gameController.currentPlayer);
                

                if (gameController.checkWinner.isWinner){
                    gameController.currentPlayer.score += 1;

                    if (gameController.currentPlayer == player1){
                        playerOneScore.textContent = gameController.currentPlayer.score;
                    }

                    if (currentPlayer == player2){
                        playerTwoScore.textContent = gameController.currentPlayer.score;
                    }
                    
                    //end game
                    gameController.endGame();
                    
                    //display winner
                    displayWinner();
                }
            })
        }
    }

    const displayWinner = () => {
        let winDisplay = document.createElement('div');
        winDisplay.setAttribute(id, 'win-display');
        
        let winOverlay = document.createElement('div');
        winOverlay.setAttribute(id, 'win-overlay')
        
        let winMessage = document.createElement('p');
        winMessage.textContent = `${gameController.currentPlayer} wins the round`;
        
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

        if (!checkWinner.isWinner){
            winOverlay.style.display = none;
        }
    }

    return {
        displayBoard,
        renderBoard
    }
    

})();