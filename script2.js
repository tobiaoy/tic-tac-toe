//player factory
const player = (sign) => {
    const getSign  = () => {return sign}
    let played = false; // for when someone has just played a move
    let score = 0;
    let name;

    
    return {getSign, played, score, name}
}


//players --> to be modified later
let player1 = player('X');
player1.name = 'Player 1';

let player2 = player('O');
player2.name = 'Player 2'



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

            if (!checkWinner.isWinner() && !checkDraw.isDraw() && !gameFlow.gameEnded){
                displayController.play(i,j);
            }

            if (checkWinner.isWinner() && !gameFlow.gameEnded){
                displayController.winSequence(e);
            } 
            if(checkDraw.isDraw() && !gameFlow.gameEnded){
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

	const falsy = [undefined, '']
	
	const setRoundWinner = (x) => {
         let roundWinner = x;
        return roundWinner;
    }
	
	const vertCheck = () => {
		if ((!falsy.includes(gameBoard.getCell(0,0))) && (!falsy.includes(gameBoard.getCell(1,0))) && (!falsy.includes(gameBoard.getCell(2,0)))){
			if (gameBoard.getCell(0,0) === gameBoard.getCell(1,0) && gameBoard.getCell(1,0) === gameBoard.getCell(2,0)){
				setRoundWinner(gameBoard.getCell(0,0))
                return true;
			}
		} else if ((!falsy.includes(gameBoard.getCell(0,1))) && (!falsy.includes(gameBoard.getCell(1,1))) && (!falsy.includes(gameBoard.getCell(2,1)))){
			if (gameBoard.getCell(0,1) === gameBoard.getCell(1,1) && gameBoard.getCell(1,1) === gameBoard.getCell(2,1)){
				setRoundWinner(gameBoard.getCell(0,1));
                return true;
			}
		} else if ((!falsy.includes(gameBoard.getCell(0,2))) && (!falsy.includes(gameBoard.getCell(1,2))) && (!falsy.includes(gameBoard.getCell(2,2)))){
			if (gameBoard.getCell(0,2) === gameBoard.getCell(1,2) && gameBoard.getCell(1,2) === gameBoard.getCell(2,2)){
				setRoundWinner(gameBoard.getCell(0,2));
                return true;
			}
		} else {
            return false;
        }
	}
	
	const horCheck = () => {
		if ((!falsy.includes(gameBoard.getCell(0,0))) && (!falsy.includes(gameBoard.getCell(0,1))) && (!falsy.includes(gameBoard.getCell(0,2)))){
			if (gameBoard.getCell(0,0) === gameBoard.getCell(0,1) && gameBoard.getCell(0,1) === gameBoard.getCell(0,2)){
				setRoundWinner(gameBoard.getCell(0,0))
                return true;
			}
		} else if ((!falsy.includes(gameBoard.getCell(1,0))) && (!falsy.includes(gameBoard.getCell(1,1))) && (!falsy.includes(gameBoard.getCell(1,2)))){
			if (gameBoard.getCell(1,0) === gameBoard.getCell(1,1) && gameBoard.getCell(1,1) === gameBoard.getCell(1,2)){
				setRoundWinner(gameBoard.getCell(1,0));
                return true;
			}
		} else if ((!falsy.includes(gameBoard.getCell(2,0))) && (!falsy.includes(gameBoard.getCell(2,1))) && (!falsy.includes(gameBoard.getCell(2,2)))){
			if (gameBoard.getCell(2,0) === gameBoard.getCell(2,1) && gameBoard.getCell(2,1) === gameBoard.getCell(2,2)){
				setRoundWinner(gameBoard.getCell(2,0));
                return true;
			}
		} else {
            return false;
        }
		

	}
	
	const diagCheck = () => {
		if ((!falsy.includes(gameBoard.getCell(0,0))) && (!falsy.includes(gameBoard.getCell(1,1))) && (!falsy.includes(gameBoard.getCell(2,2)))){
			if (gameBoard.getCell(0,0) === gameBoard.getCell(1,1) && gameBoard.getCell(1,1) === gameBoard.getCell(2,2)){
				setRoundWinner(gameBoard.getCell(1,1));
                return true;
			} 
		} else if ((!falsy.includes(gameBoard.getCell(0,2))) && (!falsy.includes(gameBoard.getCell(1,1))) && (!falsy.includes(gameBoard.getCell(2,0)))){
			if (gameBoard.getCell(0,2) === gameBoard.getCell(1,1) && gameBoard.getCell(1,1) === gameBoard.getCell(2,0)){
				setRoundWinner(gameBoard.getCell(1,1));
                return true;
			}
		}
		
	}
	
	const isWinner = () => {
		let win = false;
		
		if (vertCheck()) {
			win = true;
		} else if (horCheck()){
			win = true;
		} else if (diagCheck()){
			win = true;
		} else {
            win = false;
        }
		
		return win;
		
	}
	
	return {setRoundWinner, isWinner}
	
})()





//check draw module
const checkDraw = (() => {

    const checkFull = () => {
        let isFull = false;

        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (gameBoard.getCell(i,j) !== '' && gameBoard.getCell(i,j) !== undefined){
                    isFull = true;
                }
            }
        }

        for (let i = 0; i < 3; i++){
            for (let j = 0; j < 3; j++){
                if (gameBoard.getCell(i,j) === '' || gameBoard.getCell(i,j) === undefined){
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
        } else {
            return false;
        }
    }

    return {isDraw}

})()


const gameFlow = (() => {
    let currentPlayer = player1;
    let currentRound = 1;
    let gameEnded = false;


    return {currentPlayer, 
        gameEnded, 
        currentRound
    }
})()




//display controller
const displayController = (() => {
    const resetBtn = document.querySelector('#reset-btn')
    const quitBtn = document.querySelector('#quit-btn')
    const winOverlay = document.querySelector('#win-overlay');
    const winMessage = document.querySelector('#win-message');
    const displayBoard = document.querySelector('#display-board'); //display version of the game board
    const currPlayer = document.querySelector('#curr-player');
    const currRound = document.querySelector('#curr-round');
    //currPlayer.textContent = `current player: ${gameFlow.currentPlayer.name}`; //displays the current player -> will change to name later
    const playerOneScore = document.querySelector('#p1-score'); //displays player 1's score
    const playerTwoScore = document.querySelector('#p2-score'); //displays player 2's score
    const playerOneName = document.querySelector('#p1-name');
    const playerTwoName = document.querySelector('#p2-name');
    const restartBtn = document.querySelector('#restart-btn');
    const quitBtn2 = document.querySelector('#quit-btn2');
    const p1Box = document.querySelector('#p1-box');
    const p2Box = document.querySelector('#p2-box');


    playerOneName.addEventListener('change', () => {
        if (playerOneName.value === '' || playerOneName === undefined){
            player1.name = 'Player 1'
        } else {
        player1.name = playerOneName.value
        }
    })

    playerTwoName.addEventListener('change', () => {
        if (playerTwoName.value === '' || playerTwoName === undefined){
            player2.name = 'Player 2'
        } else {
         player2.name = playerTwoName.value;
        }
    });

    //figure out how to render the board and have it show updates when plays happen
    const renderBoard = (() => {
        displayBoard.appendChild(gameBoard.frame);
    })();

    const play = (i,j) => {
        let sign = gameFlow.currentPlayer.getSign();
        gameBoard.setCell(sign,i,j);

        
        if (!checkWinner.isWinner()){
        if (gameFlow.currentPlayer === player1){
            player1.played = true;
            player2.played = false;
            gameFlow.currentPlayer = player2;
            currPlayer.textContent = `Current Player: ${gameFlow.currentPlayer.name}`;

            //switches to player 2;
            p1Box.classList.remove('player-box-active');
            p1Box.classList.add('player-box');
            p2Box.classList.remove('player-box');
            p2Box.classList.add('player-box-active');

    
        } else if (gameFlow.currentPlayer === player2)  {
            player2.played = true;
            player1.played = false;
            gameFlow.currentPlayer = player1;
            currPlayer.textContent = `Current Player: ${gameFlow.currentPlayer.name}`;

            //switches to player 1
            p2Box.classList.remove('player-box-active');
            p2Box.classList.add('player-box');
            p1Box.classList.remove('player-box');
            p1Box.classList.add('player-box-active');
        }
    }
    
    }

    const winSequence = (e) => {

        const setWinner = () => {
            let winner;
            let winSign = e.target.textContent;
            let players = [player1, player2];

            for (let i=0; i < 2; i++){
                if (players[i].getSign() === winSign){
                    winner = players[i].name;
                }
            }

            return winner;
        }

        winMessage.textContent = `${setWinner()} wins the game`; //change win message based on the winner
        gameFlow.currentRound +=1; //increment the round count
        displayWinOverlay(); //display win screen
        
        //increment winning player's score
        if (gameFlow.currentPlayer === player1){
            player1.score +=1;
            playerOneScore.textContent = `${gameFlow.currentPlayer.score}`;
        } else if (gameFlow.currentPlayer === player2){
            player2.score +=1;
            playerTwoScore.textContent = `${gameFlow.currentPlayer.score}`;
        
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
        currRound.textContent = `Current Round: ${gameFlow.currentRound}`
        gameFlow.gameEnded = false;
    })
    
    quitBtn.addEventListener('click', () => {
        winOverlay.style.display = 'none';
        gameFlow.gameEnded = true;
    })

    restartBtn.addEventListener('click', () => {
        window.location.reload();
    })

    quitBtn2.addEventListener('click', () => {
        gameFlow.gameEnded = true;
    })


    return {
        displayBoard,
        renderBoard,
        play,
        winSequence,
        drawSequence
    }
    

})();
