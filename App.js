import React from 'react';
// eslint-disable-next-line no-unused-vars
import Board from './board/board';
// eslint-disable-next-line no-unused-vars
import Start from './start/start';
// eslint-disable-next-line no-unused-vars
import History from './history/history';
// eslint-disable-next-line no-unused-vars
import Bootstrap from './css/bootstrap.css';
// eslint-disable-next-line no-unused-vars
import { type } from 'os';
import { all } from 'q';

/**
 * @typedef figure
 * @type {object}
 * @property {string} name
 * @property {string} color
 * @property {number} number
 */
/**
 * @typedef move
 * @type {object}
 * @property {figure} figure
 * @property {string} lastRow
 * @property {number} lastIndex
 * @property {string} row
 * @property {number} index
 * @property {figure} catched
 * @property {number} player
 */

/**
 * @typedef possibleMoves
 * @type Array.Array.<string, number>
 */


class Chess extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			board: [
				[
					{name: 'Rook', color: 'black', number: 1}, {name: 'Knight', color: 'black', number: 1}, 
					{name: 'Bishop', color: 'black', number: 1}, {name: 'King', color: 'black', number: 1}, 
					{name: 'Queen', color: 'black', number: 1}, {name: 'Bishop', color: 'black', number: 2}, 
					{name: 'Knight', color: 'black', number: 2}, {name: 'Rook', color: 'black', number: 2}
				],
				[
					{name: 'Pawn', color: 'black', number: 1}, {name: 'Pawn', color: 'black', number: 2}, 
					{name: 'Pawn', color: 'black', number: 3}, {name: 'Pawn', color: 'black', number: 4}, 
					{name: 'Pawn', color: 'black', number: 5}, {name: 'Pawn', color: 'black', number: 6}, 
					{name: 'Pawn', color: 'black', number: 7}, {name: 'Pawn', color: 'black', number: 8}
				],
				new Array(8).fill({name: null, color: null, number: null}),
				new Array(8).fill({name: null, color: null, number: null}),
				new Array(8).fill({name: null, color: null, number: null}),
				new Array(8).fill({name: null, color: null, number: null}),
				[
					{name: 'Pawn', color: 'white', number: 1}, {name: 'Pawn', color: 'white', number: 2}, 
					{name: 'Pawn', color: 'white', number: 3}, {name: 'Pawn', color: 'white', number: 4}, 
					{name: 'Pawn', color: 'white', number: 5}, {name: 'Pawn', color: 'white', number: 6}, 
					{name: 'Pawn', color: 'white', number: 7}, {name: 'Pawn', color: 'white', number: 8}
				],
				[
					{name: 'Rook', color: 'white', number: 1}, {name: 'Knight', color: 'white', number: 1}, 
					{name: 'Bishop', color: 'white', number: 1}, {name: 'King', color: 'white', number: 1}, 
					{name: 'Queen', color: 'white', number: 1}, {name: 'Bishop', color: 'white', number: 2}, 
					{name: 'Knight', color: 'white', number: 2}, {name: 'Rook', color: 'white', number: 2}
				]
			],
			rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
			/**@type move */
			move: {
				figure: {
					name: null,
					color: null,
					number: null, 
				},
				lastRow: null, 
				lastIndex: null, 
				row: null,
				index: null,
				catched: null,
				player: null,
			},
			players: (props.players) ?  props.players : new Array(2).fill({name: '', catched: []}), 
			currentPlayer: true,
			history: [],
			possibleMoves: [[null, null]]
		};
	}
	/**
     *  Gives the numerical row 
     * @param {string} letter - Rowname
     * @returns {number}
     */
	letterToIndex(letter) {
		return this.rows.indexOf(letter);;
	}
	/**
	 * Gives Row to numerical 
	 * @param {number} index - Index
	 * @returns {string}
	 */
	indexToLetter(index) {
		return this.rows[index];
	}

	/**
	 * Calculates possible pawn moves 
	 * @param {move} move 
	 * @returns {Array.Array.<number, number>}
	 */
	pawnMove(move, board=this.state.board)	{
		//TODO
		/**
		 * type {Array.Array.<number, number>}
		 */
		let possibleMoves = [];
		if (move.lastRow+1 < 8 && move.lastIndex-1 > 0) {
			if (
				board[move.lastRow+1][move.lastIndex-1].color !== move.figure.color 
				&& board[move.lastRow+1][move.lastIndex-1].color !== null
			) {
				possibleMoves.push([move.lastRow+1, move.lastIndex-1]);
			}
		}
		if (move.lastIndex+1 < 8) {
			if (board[move.lastRow+1][move.lastIndex+1].color !== move.figure.color
				&& board[move.lastRow+1][move.lastIndex+1].color !== null
			) {
				possibleMoves.push([move.lastRow+1, move.lastIndex+1]);
			}
		}
		if (move.lastRow-1 > 0 && move.lastIndex-1 > 0) {
			if (
				board[move.lastRow-1][move.lastIndex-1].color !== move.figure.color
				&& board[move.lastRow-1][move.lastIndex-1].color !== null
			) {
				possibleMoves.push([move.lastRow-1, move.lastIndex-1]);
			}
		}
		if (move.lastIndex+1 < 8) {
			if (
				board[move.lastRow-1][move.lastIndex+1].color !== move.figure.color
				&& board[move.lastRow-1][move.lastIndex+1].color !== null
			) {
				possibleMoves.push([move.lastRow-1, move.lastIndex+1]);
			}
		}
		
		if (move.figure.color === 'black' && move.lastRow < 7) {
			if (board[move.lastRow+1][move.lastIndex].color === null) {
				possibleMoves.push([move.lastRow+1, move.lastIndex]);
			}
			if (move.lastRow === 1) {
				if (board[move.lastRow+2][move.lastIndex].color === null) {
					possibleMoves.push([move.lastRow+2, move.lastIndex]);
				}
			}
		}
		if (move.figure.color === 'white' && move.lastRow > 0) {
			if (board[move.lastRow-1][move.lastIndex].color === null) {
				possibleMoves.push([move.lastRow-1, move.lastIndex]);
			}
			if (move.lastRow === 6) {
				if (board[move.lastRow-2][move.lastIndex].color === null) {
					possibleMoves.push([move.lastRow-2, move.lastIndex]);
				}
			}
		}
		return possibleMoves;
	}

	rookMove(move, board=this.state.board) {
		let possibleMoves = [];
		for (let i = move.lastRow+1; i < 8; i++) {
			if (board[i][move.lastIndex].color === null) {
				possibleMoves.push([i, move.lastIndex]);
			} else if (board[i][move.lastIndex].color !== move.figure.color) {
				possibleMoves.push([i, move.lastIndex]);
				break;
			} else {
				break;
			}
		}
		for (let i = move.lastRow-1; i > -1; i--) {
			if (board[i][move.lastIndex].color === null) {
				possibleMoves.push([i, move.lastIndex]);
			} else if (board[i][move.lastIndex].color !== move.figure.color) {
				possibleMoves.push([i, move.lastIndex]);
				break;
			} else {
				break;
			}
		}
		for (let i = move.lastIndex+1; i < 8; i++) {
			if (board[move.lastRow][i].color === null) {
				possibleMoves.push([move.lastRow, i]);
			} else if (board[move.lastRow][i].color !== move.figure.color) {
				possibleMoves.push([move.lastRow, i]);
				break;
			} else {
				break;
			}
		}
		for (let i = move.lastIndex-1; i > -1; i--) {
			if (board[move.lastRow][i].color === null) {
				possibleMoves.push([move.lastRow, i]);
			} else if (board[move.lastRow][i].color !== move.figure.color) {
				possibleMoves.push([move.lastRow, i]);
				break;
			} else {
				break;
			}
		}
		return possibleMoves;
	}

	knightMove(move, board=this.state.board) {
		let possibleMoves = [];
		if (move.lastRow+2 < 8 && move.lastIndex+1 < 8) {
			if (
				(board[move.lastRow+2][move.lastIndex+1].color !== null
				&& board[move.lastRow+2][move.lastIndex+1].color !== move.figure.color)
				|| board[move.lastRow+2][move.lastIndex+1].color !== move.figure.color
			) {
				possibleMoves.push([move.lastRow+2, move.lastIndex+1]);
			}
		}
		if (move.lastRow+2 < 8 && move.lastIndex-1 > -1) {
			if (
				(board[move.lastRow+2][move.lastIndex-1].color !== null
				&& board[move.lastRow+2][move.lastIndex-1].color !== move.figure.color)
				|| board[move.lastRow+2][move.lastIndex-1].color !== move.figure.color
			) {
				possibleMoves.push([move.lastRow+2, move.lastIndex-1]);
			}
		}
		if (move.lastRow-2 > -1 && move.lastIndex+1 < 8) {
			if (
				(board[move.lastRow-2][move.lastIndex+1].color !== null
				&& board[move.lastRow-2][move.lastIndex+1].color !== move.figure.color)
				|| board[move.lastRow-2][move.lastIndex+1].color !== move.figure.color
			) {
				possibleMoves.push([move.lastRow-2, move.lastIndex+1]);
			}
		}
		if (move.lastRow-2 > -1 && move.lastIndex-1 > -1) {
			if (
				(board[move.lastRow-2][move.lastIndex-1].color !== null
				&& board[move.lastRow-2][move.lastIndex-1].color !== move.figure.color)
				|| board[move.lastRow-2][move.lastIndex-1].color !== move.figure.color
			) {
				possibleMoves.push([move.lastRow-2, move.lastIndex-1]);
			}
		}
		return possibleMoves;
	}

	bishopMove(move, board=this.state.board) {
		let possibleMoves = [];
		let [i, j] = [move.lastRow+1, move.lastIndex+1];
		while (i < 8 && j < 8) {
			if (board[i][j].color === null) {
				possibleMoves.push([i, j]);
			} else if (board[i][j].color !== move.figure.color) {
				possibleMoves.push([i, j]);
				break;
			} else {
				break;
			}
			i++;
			j++;
		}
		[i, j] = [move.lastRow-1, move.lastIndex-1];
		while (i > -1 && j > -1) {
			if (board[i][j].color === null) {
				possibleMoves.push([i, j]);
			} else if (board[i][j].color !== move.figure.color) {
				possibleMoves.push([i, j]);
				break;
			} else {
				break;
			}
			i--;
			j--;
		}
		[i, j] = [move.lastRow-1, move.lastIndex+1];
		while (i > -1 && j < 8) {
			if (board[i][j].color === null) {
				possibleMoves.push([i, j]);
			} else if (board[i][j].color !== move.figure.color) {
				possibleMoves.push([i, j]);
				break;
			} else {
				break;
			}
			i--;
			j++;
		}
		[i, j] = [move.lastRow+1, move.lastIndex-1];
		while (i < 8 && j > -1) {
			if (board[i][j].color === null) {
				possibleMoves.push([i, j]);
			} else if (board[i][j].color !== move.figure.color) {
				possibleMoves.push([i, j]);
				break;
			} else {
				break;
			}
			i++;
			j--;
		}
		return possibleMoves;
	}
	
	queenMove(move, board=this.state.board) {
		let possibleMoves = [];
		possibleMoves = [...this.rookMove(move, board)];
		possibleMoves = [...possibleMoves, ...this.bishopMove(move, board)];
		return possibleMoves;
	}
	
	kingMove(move, board=this.state.board) {
		let possibleMoves = [];
			
		const checkCapture = (element) => {
			let checkMate = [];
			let chess = JSON.parse(JSON.stringify(board));
			chess[element[0]][element[1]] = move.figure;
			chess[move.lastRow][move.lastIndex] = {name: null, color: null, number: null};
			chess.forEach((row, rowIndex) => {
				row.forEach((field, fieldIndex) => {
					let fMove = {
						figure: field,
						lastRow: rowIndex,
						lastIndex: fieldIndex
					};
					let possibleMoves = [[null, null]];
					if (field.color !== move.figure.color && field.color !== null) {
						if (field.name === 'King') {
							possibleMoves = [
								[rowIndex+1, fieldIndex], [rowIndex+1, fieldIndex+1],
								[rowIndex+1, fieldIndex-1], [rowIndex-1, fieldIndex],
								[rowIndex-1, fieldIndex+1], [rowIndex-1, fieldIndex-1],
								[rowIndex, fieldIndex+1], [rowIndex, fieldIndex-1]
							];
						} else {
							possibleMoves = this.findMoves(fMove, chess);
						}
						checkMate.push(possibleMoves.find((m) => {
							return (m[0] === element[0] && m[1] === element[1]);
							}));
					}
					checkMate = checkMate.filter((element) => {
						return !(element === undefined);
					});
					});
				});
			return (checkMate.length !== 0) ? false : true;
		};

		if (move.lastRow+1 < 8 && board[move.lastRow+1][move.lastIndex].color !== move.figure.color) {
				possibleMoves.push([move.lastRow+1, move.lastIndex]);
			if (move.lastIndex-1 > -1 && board[move.lastRow+1][move.lastIndex-1].color !== move.figure.color) {
				possibleMoves.push([move.lastRow+1, move.lastIndex-1]);
			}
			if (move.lastIndex+1 < 8 && board[move.lastRow+1][move.lastIndex+1].color !== move.figure.color) {
				possibleMoves.push([move.lastRow+1, move.lastIndex+1]);
			}
		} 
		if (move.lastRow-1 > -1 && board[move.lastRow-1][move.lastIndex].color !== move.figure.color) {
			possibleMoves.push([move.lastRow-1, move.lastIndex]);
			if (move.lastIndex-1 > -1 && board[move.lastRow-1][move.lastIndex-1].color !== move.figure.color) {
				possibleMoves.push([move.lastRow-1, move.lastIndex-1]);
			}
			if (move.lastIndex+1 < 8 && board[move.lastRow-1][move.lastIndex+1].color !== move.figure.color) {
				possibleMoves.push([move.lastRow-1, move.lastIndex+1]);
			}
		} 
		if (move.lastIndex+1 < 8 && board[move.lastRow][move.lastIndex+1].color !== move.figure.color) {
			possibleMoves.push([move.lastRow, move.lastIndex+1]);
		}
		if (move.lastIndex-1 > -1 && board[move.lastRow][move.lastIndex-1].color !== move.figure.color) {
			possibleMoves.push([move.lastRow, move.lastIndex-1]);
		}
		possibleMoves = possibleMoves.filter((element) => {
			return checkCapture(element, board);
		})
		return possibleMoves;
	}

	findMoves(move, board=this.state.board) {
		let possibleMoves = this[move.figure.name.toLowerCase()+'Move'](move, board);
		possibleMoves = (possibleMoves.length === 0) ? [[null, null]] : possibleMoves;
		return possibleMoves;
	}

	getPlayers(players) {
		this.setState({
			players: players
		});
	}
    

	catchFigure(catched, position) {
		if (catched.name.match('King')) {
			alert('won'); //win function
		} else {
			this.setState((state) => {
				state.board[state.move.lastRow][state.move.lastIndex] = {name: null, color: null, number: null};
				state.board[position[0]][position[1]] = state.move.figure;
				state.move.row = position[0];
				state.move.index = position[1];
				state.move.catched = catched;
				return state;
			});
			this.writeHistory();
		} 
	}


	writeHistory() {
		this.setState((state) => {
			state.history.push(state.move);
			if (state.move.catched !== null) state.players[Number(state.currentPlayer)].catched.push(state.move.catched);
			state.currentPlayer = !state.currentPlayer;
			state.possibleMoves = [[null, null]];
			state.move = {
				figure: {
					name: null,
					color: null,
					number: null, 
				},
				lastRow: null, 
				lastIndex: null, 
				row: null,
				index: null,
				catched: null,
				player: null,
			};
			return state;
		});
	}
    
	move(event) {
		let field = event.target;
		let position = field.getAttribute('position').split(':');
		position[0] = Number(position[0]);
		position[1] = Number(position[1]);
		let figure = this.state.board[position[0]][position[1]];
		if (figure.name === null) {
			if (this.state.move.figure.name === null) {
				this.resetMove();
				return;
			}
		}
		if (figure.color === this.state.move.figure.color) {
			this.setState((state) => {
				state.move = {
					figure: {
						name: null,
						color: null,
						number: null, 
					},
					lastRow: null, 
					lastIndex: null, 
					row: null,
					index: null,
					catched: null,
					player: null,
				};
				state.possibleMoves = [[null, null]];
				return state;
			});
		}
		if (
			(figure.color === 'black' && this.state.currentPlayer !== false 
			&& this.state.move.figure.color !== 'white')
			|| (figure.color === 'white' && this.state.currentPlayer !== true
			&& this.state.move.figure.color !== 'black')
    //        && this.state.move.figure.name === null
		) {
			this.resetMove();
			return;
		}
		if (this.state.move.figure.name === null) {
			let move = {
				figure: {
					name: figure.name,
					color: figure.color,
					number: figure.number
				},
				lastRow: position[0],
				lastIndex: position[1],
				row: null,
				index: null,
				catched: null,
				player: this.state.players[(this.state.currentPlayer === false) ? 0 : 1].name,
			}
			let possibleMoves = this.findMoves(move);
			this.setState((state) => {
				state.move = move;
				state.possibleMoves = possibleMoves;
				return state;
			});
		} else {
			let finalMove = this.state.possibleMoves.find((element) => {
				return position[0] === element[0] && position[1] === element[1];
			});
			if (!finalMove) {
				this.resetMove();
				return;
			}
			if (figure.name === null) {
				let futureMove = this.state.move;
				futureMove.row = position[0];
				futureMove.index = position[1];
				this.setState((state) => {
					state.move.row = position[0];
					state.move.index = position[1];
					state.board[state.move.lastRow][state.move.lastIndex] = {name: null, color: null, number: null};
					state.board[position[0]][position[1]] = state.move.figure;
					return state;
				});
				this.writeHistory();
			} else {
				this.catchFigure(figure, position);
			}
		}
	}

	resetMove() {
		this.setState((state) => {
			state.move = {
				figure: {
					name: null,
					color: null,
					number: null
				},
				lastRow: null,
				lastIndex: null,
				row: null,
				index: null,
				catched: null,
				player: null
			};
			state.possibleMoves = [[null, null]];
			return state;
		});
	}

	undoMove(move) {
		this.setState((state) => {
			state.board[move.lastRow][move.lastIndex] = move.figure;
			state.currentPlayer = !state.currentPlayer;
			if (move.catched) {
				state.board[move.row][move.index] = move.catched;
			} else {
				state.board[move.row][move.index] = {figure: null, color: null, number: null};
			}
			state.history.pop();
			state.move = {
				figure: {
					name: null,
					color: null,
					number: null
				},
				lastRow: null,
				lastIndex: null,
				row: null,
				index: null,
				catched: null,
				player: null
			};
			return state;
		});
	}

	render () {
			return (
            <> 
				<Board move={(event) => this.move(event)} board={this.state.board} possibleMoves={this.state.possibleMoves}/>
				<History history={this.state.history} /> 
            </>
			);
	}
}

export default Chess;