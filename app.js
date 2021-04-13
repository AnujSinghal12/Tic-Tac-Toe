class GameBoard {
	constructor(side){
		this.side = side;
		this.board = [];
		for(let i=0; i<this.side; i++){
			this.board.push([]);
		}
		for(let i=0; i<this.side; i++){
			for(let j=0; j<this.side; j++){
				this.board[i].push("");
			}
		}
	}

	checkRow(){
		for(let i=0; i<this.side; i++){
			let count=0;
			for(let j=0; j<this.side; j++){
				if(this.board[i][j]===this.board[i][0] && this.board[i][j]!==""){
					count++;
				}
			}
			if(count === this.side)
				return true;
		}
		return false;
	}

	checkColumn(){
		for(let i=0; i<this.side; i++){
			let count=0;
			for(let j=0; j<this.side; j++){
				if(this.board[j][i]===this.board[0][i] && this.board[j][i]!==""){
					count++;
				}
			}
			if(count === this.side)
				return true;
		}
		return false;
	}

	checkDiagonal(){
		let count = 0;
		for(let i=0; i<this.side; i++){
			if(this.board[i][i] === this.board[0][0] && this.board[i][i]!==""){
				count++;
			}
		}
		if(count === this.side)
			return true;
		count = 0;
		for(let i=0; i<this.side; i++){
			if(this.board[i][this.side-i-1] === this.board[0][this.side-1] && this.board[i][this.side-i-1]!==""){
				count++;
			}
		}
		if(count === this.side)
			return true;
		return false;		
	}

	checkWin(){
		if(this.checkRow() || this.checkDiagonal() || this.checkColumn())
			return true;
		return false;
	}

	setBoard(index, playerMark){
		let i=parseInt(index/this.side);
		let j=index-(i*this.side);
		this.board[i][j] = playerMark;
	}

	render(){
		for(let i=0; i<this.side; i++){
			for(let j=0; j<this.side ;j++){
				document.querySelector(`[data-id = "${(this.side*i)+j}"]`).innerText = this.board[i][j];
			}
		}
	}

	checkAvailable(index){
		let i=(parseInt(index/this.side));
		let j=index-(i*this.side);
		return this.board[i][j] === "";
	}

	reset(){
		for(let i=0; i<this.side; i++){
			for(let j=0; j<this.side; j++){
				this.board[i][j]="";
			}
		}
	}
}

class Player {
	constructor(playerName, playerMark){
		this.playerName = playerName;
		this.playerMark = playerMark;
	}


}

function play(e){
	const index = parseInt(e.target.getAttribute("data-id"));
	if(gameBoard.checkAvailable(index)){
		gameBoard.setBoard(index, whoseTurn.playerMark);
		gameBoard.render();
		turns++;
		if(whoseTurn === player1)
			whoseTurn = player2;
		else
			whoseTurn = player1;
	}
	if(gameBoard.checkWin()){
		let winner;
		if(whoseTurn === player1)
			winner = player2;
		else
			winner = player1;
		alert(`${winner.playerMark} is the winner!`);
		gameBoard.reset();
		gameBoard.render();
		whoseTurn=player1;
		turns=0;
	}
	if(turns===gameBoard.side*gameBoard.side){
		alert("Tie");
		gameBoard.reset();
		gameBoard.render();
		whoseTurn=player1;
		turns=0;
	}
}


const gameBoard = new GameBoard(3);
const player1 = new Player("player1", "X");
const player2 = new Player("player2", "O");

let whoseTurn = player1;
let turns = 0;

document.querySelectorAll(".item").forEach(item => {item.addEventListener("click", play)});
document.querySelector(".reset").addEventListener("click", () => {
	gameBoard.reset();
	gameBoard.render();
	whoseTurn=player1;
	turns=0;
});
