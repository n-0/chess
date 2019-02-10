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


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			board: [
				[
					{name: 'Rook', color: 'black', number: 1}, {name: 'Knight', color: 'black', number: 1}, 
					{name: 'Bishop', color: 'black', number: 1}, {name: 'King', color: 'black', number: 1}, 
					{name: 'Queen', color: 'black'}, {name: 'Bishop', color: 'black', number: 2}, 
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
					{name: 'Queen', color: 'white'}, {name: 'Bishop', color: 'white', number: 2}, 
					{name: 'Knight', color: 'white', number: 2}, {name: 'Rook', color: 'white', number: 2}
				]
			],
			rows: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
			/*
			board: {
				'A': [{name: 'Rook', color: 'black', number: 1}, {name: 'Knight', color: 'black', number: 1}, 
					{name: 'Bishop', color: 'black', number: 1}, {name: 'King', color: 'black', number: 1}, {name: 'Queen', color: 'black'}, 
					{name: 'Bishop', color: 'black', number: 2}, {name: 'Knight', color: 'black', number: 2}, 
					{name: 'Rook', color: 'black', number: 2}],
				'B': [{name: 'Pawn', color: 'black', number: 1}, {name: 'Pawn', color: 'black', number: 2}, 
					{name: 'Pawn', color: 'black', number: 3}, {name: 'Pawn', color: 'black', number: 4}, {name: 'Pawn', color: 'black', number: 5},
					{name: 'Pawn', color: 'black', number: 6}, {name: 'Pawn', color: 'black', number: 7}, {name: 'Pawn', color: 'black', number: 8}],
				'C': new Array(8).fill({name: null, color: null, number: null}),
				'D': new Array(8).fill({name: null, color: null, number: null}),
				'E': new Array(8).fill({name: null, color: null, number: null}),
				'F': new Array(8).fill({name: null, color: null, number: null}),
				'G': [{name: 'Pawn', color: 'white', number: 1}, {name: 'Pawn', color: 'white', number: 2}, 
					{name: 'Pawn', color: 'white', number: 3}, {name: 'Pawn', color: 'white', number: 4}, {name: 'Pawn', color: 'white', number: 5},
					{name: 'Pawn', color: 'white', number: 6}, {name: 'Pawn', color: 'white', number: 7}, {name: 'Pawn', color: 'white', number: 8}],
				'H': [{name: 'Rook', color: 'white', number: 1}, {name: 'Knight', color: 'white', number: 1}, 
					{name: 'Bishop', color: 'white', number: 1}, {name: 'King', color: 'white', number: 1}, {name: 'Queen', color: 'white'}, 
					{name: 'Bishop', color: 'white', number: 2}, {name: 'Knight', color: 'white', number: 2}, {name: 'Rook', color: 'white', number: 2}],
			},
			//            move: [null, null, null], //[row, index, figure]
			*/
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
			players: new Array(2).fill({name: '', catched: []}), 
			currentPlayer: true,
			history: [],
		};
	}
	/**
     *  Gives the numerical row 
     * @param {string} letter - Rowname
     * @returns {number}
     */
	letterToIndex(letter) {
		return Object.keys(this.state.board).indexOf(letter);
	}
	/**
	 * Gives Row to numerical 
	 * @param {number} index - Index
	 * @returns {string}
	 */
	indexToLetter(index) {
		return Object.keys(this.state.board)[index];
	}

	/**
	 * Calculates possible pawn moves 
	 * @param {move} move 
	 * @returns {Array.Array.<string, number>}
	 */
	pawnMove2(move)	{
		//TODO
		/**
		 * type {Array.Array.<string, number>}
		 */
		let possibleMoves = [];
		if (
			move.figure.color === 'black' && move.lastRow !== 7 
			|| move.figure.color === 'white' && move.lastRow !== 0
		) {
			if (
				this.board[move.lastRow+1][move.lastIndex-1].color !== move.figure.color 
				&& this.board[move.lastRow+1][move.lastIndex-1].color !== null
			) {
				possibleMoves.push([move.lastRow+1, move.lastIndex-1]);
			}
			if (this.board[move.lastRow+1][move.lastIndex+1].color !== move.figure.color
				&& this.board[move.lastRow+1][move.lastIndex-1].color !== null
			) {
				possibleMoves.push([move.lastRow+1, move.lastIndex+1]);
			}
		}
		if (
			move.figure.color === 'black' && move.lastRow !== 0 
			|| move.figure.color === 'white' && move.lastRow !== 7 
		) {
			if (
				this.board[move.lastRow-1][move.lastIndex-1].color !== move.figure.color
				&& this.board[move.lastRow-1][move.lastIndex-1].color !== null
			) {
				possibleMoves.push([move.lastRow-1, move.lastIndex-1]);
			}
			if (
				this.board[move.lastRow-1][move.lastIndex+1].color !== move.figure.color
				&& this.board[move.lastRow-1][move.lastIndex+1].color !== null
			) {
				possibleMoves.push([move.lastRow-1, move.lastIndex+1]);
			}
		}
		if (move.figure.color === 'black' && move.lastRow !== 7) {
			if (this.board[move.lastRow+1][move.lastIndex].color === null) {
				possibleMoves.push([move.lastRow+1, move.lastIndex]);
			}
			if (move.row === 1) {
				if (this.board[move.lastRow+2][move.lastIndex].color === null) {
					possibleMoves.push([move.lastRow+2, move.lastIndex]);
				}
			}
		}
		if (move.figure.color === 'white' && move.lastRow !== 0) {
			if (this.board[move.lastRow-1][move.lastIndex].color === null) {
				possibleMoves.push([move.lastRow-1, move.lastIndex]);
			}
			if (move.row === 6) {
				if (this.board[this.indexToLetter(this.letterToIndex(move.lastRow)-2)][move.lastIndex].color === null) {
					possibleMoves.push([this.indexToLetter(this.letterToIndex(move.lastRow)-2), move.lastIndex]);
				}
			}
		}
		return possibleMoves;
	}

	rookMove2(move) {
		let possibleMoves = [];
		for (let i = move.lastRow; i < 8; i++) {
			if (this.board[i][move.lastIndex].color === null) {
				possibleMoves.push([i, move.lastIndex]);
			} else if (this.board[i][move.lastIndex].color !== move.figure.color) {
				possibleMoves.push([i, move.lastIndex]);
				break;
			} else {
				break;
			}
		}
		for (let i = move.lastRow; i > -1; i--) {
			if (this.board[i][move.lastIndex].color === null) {
				possibleMoves.push([i, move.lastIndex]);
			} else if (this.board[i][move.lastIndex].color !== move.figure.color) {
				possibleMoves.push([i, move.lastIndex]);
				break;
			} else {
				break;
			}
		}
		for (let i = move.lastIndex; i < 8; i++) {
			if (this.board[move.lastRow][i].color === null) {
				possibleMoves.push([move.lastRow, i]);
			} else if (this.board[move.lastRow][i].color !== move.figure.color) {
				possibleMoves.push([move.lastRow, i]);
				break;
			} else {
				break;
			}
		}
		for (let i = move.lastRow; i > -1; i--) {
			if (this.board[move.lastRow][i].color === null) {
				possibleMoves.push([move.lastRow, i]);
			} else if (this.board[move.lastRow][i].color !== move.figure.color) {
				possibleMoves.push([move.lastRow, i]);
				break;
			} else {
				break;
			}
		}
		return possibleMoves;
	}

	knightMove2(move) {
		let possibleMoves = [];
		if (move.lastRow+2 < 8 && move.lastIndex+1 < 8) {
			if (this.board[move.lastRow+2][move.lastIndex+1].color !== null
				|| this.board[move.lastRow+2][move.lastIndex+1].color !== move.figure.color
			) {
				possibleMoves.push([move.lastRow+2][move.lastIndex+1]);
			}
		}
		if (move.lastRow+2 < 8 && move.lastIndex-1 > -1) {
			if (this.board[move.lastRow+2][move.lastIndex-1].color !== null
				|| this.board[move.lastRow+2][move.lastIndex-1].color !== move.figure.color
			) {
				possibleMoves.push([move.lastRow+2][move.lastIndex-1]);
			}
		}
		if (move.lastRow-2 > -1 && move.lastIndex+1 < 8) {
			if (this.board[move.lastRow-2][move.lastIndex+1].color !== null
				|| this.board[move.lastRow-2][move.lastIndex+1].color !== move.figure.color
			) {
				possibleMoves.push([move.lastRow-2][move.lastIndex+1]);
			}
		}
		if (move.lastRow-2 > -1 && move.lastIndex-1 > -1) {
			if (this.board[move.lastRow+2][move.lastIndex-1].color !== null
				|| this.board[move.lastRow+2][move.lastIndex-1].color !== move.figure.color
			) {
				possibleMoves.push([move.lastRow+2][move.lastIndex-1]);
			}
		}
		return possibleMoves;
	}

	kingMove2(move) {
		let possibleMoves = [];
		if (move.lastRow <= 6) {
			possibleMoves.push([move.lastRow+1, move.lastIndex]);
			if (move.lastIndex >= 1) {
				possibleMoves.push([move.lastRow+1, move.lastIndex-1]);
			}
			if (move.lastIndex <= 6) {
				possibleMoves.push([move.lastRow+1, move.lastIndex+1]);
				possibleMoves.push([move.lastRow, move.lastIndex+1]);
			}
		} 
		if (move.lastRow >= 1) {
			possibleMoves.push([move.lastRow-1, move.lastIndex]);
			if (move.lastIndex <= 6) {
				possibleMoves.push([move.lastRow-1, move.lastIndex+1])
			}
			if (move.lastIndex >= 1) {
				possibleMoves.push([move.lastRow-1, move.lastIndex-1]);
				possibleMoves.push([move.lastRow, move.lastIndex-1]);
			}
		} 
		return possibleMoves;
	}

	queenMove(move) {
		let possibleMoves = [];
		possibleMoves.push(this.rookMove2(move));
		possibleMoves.push(this.bishopMove2(move));
		return possibleMoves;
	}

	bishopMove2(move) {
		let possibleMoves = [];
		let [i, j] = [move.lastRow, move.lastIndex];
		while (i < 8 && j < 8) {
			if (this.board[i][j].color === null) {
				possibleMoves.push([i, j]);
			} else if (this.board[i][j].color !== move.figure.color) {
				possibleMoves.push([i, j]);
				break;
			} else {
				break;
			}
			i++;
			j++;
		}
		while (i > -1 && j > -1) {
			if (this.board[i][j].color === null) {
				possibleMoves.push([i, j]);
			} else if (this.board[i][j].color !== move.figure.color) {
				possibleMoves.push([i, j]);
				break;
			} else {
				break;
			}
			i--;
			j--;
		}
		while (i > -1 && j < 8) {
			if (this.board[i][j].color === null) {
				possibleMoves.push([i, j]);
			} else if (this.board[i][j].color !== move.figure.color) {
				possibleMoves.push([i, j]);
				break;
			} else {
				break;
			}
			i--;
			j++;
		}
		while (i < 8 && j > -1) {
			if (this.board[i][j].color === null) {
				possibleMoves.push([i, j]);
			} else if (this.board[i][j].color !== move.figure.color) {
				possibleMoves.push([i, j]);
				break;
			} else {
				break;
			}
			i++;
			j--;
		}
	}
	pawnMove(move) {
		if (
			(
				(((this.letterToIndex(move.lastRow) - this.letterToIndex(move.row)) === -1) 
            && (move.figure.color === 'black'))
            || (((this.letterToIndex(move.lastRow) - this.letterToIndex(move.row)) === 1) 
            && (move.figure.color === 'white'))
			) && move.lastIndex === move.index
		) {
			return true;
		}

		if (
			(
				((move.lastRow === 'B' && move.figure.color === 'black')
            && (this.letterToIndex(move.lastRow) - this.letterToIndex(move.row) === -2))
            || ((move.lastRow === 'G' && move.figure.color === 'white')
            && (this.letterToIndex(move.lastRow) - this.letterToIndex(move.row) === 2))
			) && move.lastIndex === move.index
		)  {
			return true;
		}
		return false; 
	}

	rookMove(move) {
		if (
			((move.lastIndex !== move.index) && (move.lastRow === move.row))
            || ((move.lastIndex === move.index) && (move.lastRow !== move.row)) 
		) {
			return true;
		}
		return false;
	}

	bishopMove(move) {
		if (Math.abs(move.lastIndex - move.index) === Math.abs(this.letterToIndex(move.lastRow) - this.letterToIndex(move.row))) {
			return true;
		}
		return false;
	}

	knightMove(move) {
		if (
			((Math.abs(move.lastIndex - move.index) === 2) 
            && (Math.abs(this.letterToIndex(move.lastRow) - this.letterToIndex(move.row)) === 1))
            || ((Math.abs(this.letterToIndex(move.lastRow) - this.letterToIndex(move.row)) === 2)
            && (Math.abs(move.lastIndex - move.index) === 1))
		) {
			return true;
		}
		return false;
	}

	kingMove(move) {
		if (
			((Math.abs(move.lastIndex - move.Index) === 1)
            && ((move.lastRow === move.row) || (Math.abs(this.letterToIndex(move.lastRow) - this.letterToIndex(move.row)) === 1)))
            || ((move.lastIndex === move.index) && (Math.abs(this.letterToIndex(move.lastRow) - this.letterToIndex(move.row)) !== 1))
		) {
			return true;
		}
		return true;
	}
    
	queenMove(move) {
		this.pawnMove(move);
		this.rookMove(move);
	}

	checkMove(move) {
		const figureMoves = {
			'Pawn': this.pawnMove,
			'Rook': this.rookMove,
			'Knight': this.knightMove,
			'Bishop': this.bishopMove,
			'Queen': this.queenMove,
			'King': this.kingMove,
		};
		return figureMoves[move.figure.name](move);
	}

	getPlayers(players) {
		this.setState({
			players: players});
	}
    
	getRowLetter(index) {
		return Object.keys(this.state.board)[index];
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

	/*
    catchFigure = (catched, position) => {
        if (catched.name.match('King')) {
            this.won();
        } else {
                this.setState((state) => {
                const rowLetter = this.getRowLetter(state.move.row);
                state.board[rowLetter][state.move.lastIndex] = {name: null, color: null, number: null};
                state.board[this.getRowLetter(position[0])][position[1]] = state.move.figure;
                state.move.catched = catched;
                return state;
                });
                this.writeHistory();
        }
    }
*/

	writeHistory() {
		this.setState((state) => {
			state.history.push(state.move);
			if (state.move.catched !== null) state.players[Number(state.currentPlayer)].catched.push(state.move.catched);
			state.currentPlayer = !state.currentPlayer;
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
		console.log(this.state.history);
	}

    
	move(event) {
		let field = event.target;
		let position = field.getAttribute('position').split(':');
		position[1] = Number(position[1]);
		let figure = this.state.board[position[0]][position[1]];
		if (figure.name === null) {
			if (this.state.move.figure.name === null) {
				return;
			}
		}
		if (
			(figure.color === 'black' && this.state.currentPlayer !== false
            || figure.color === 'white' && this.state.currentPlayer !== true)
            && this.state.move.figure.name === null
		) {
			return;
		}
		if (this.state.move.figure.name === null) {
			console.log('Iniating move');
			this.setState((state) => {
				state.move = {
					figure: {
						name: figure.name,
						color: figure.color,
						number: figure.number,
					},
					lastRow: position[0],
					lastIndex: position[1],
					row: null,
					index: null,
					catched: null,
					player: state.players[(state.currentPlayer === false) ? 0 : 1].name,
				};
				return state;
			});
		} else {
			console.log('Move done');
			if (figure.name === null) {
				let futureMove = this.state.move;
				futureMove.row = position[0];
				futureMove.index = position[1];
				if (!this.checkMove(futureMove)) {
					return;
				}
				this.setState((state) => {
					state.move.row = position[0];
					state.move.index = position[1];
					state.board[state.move.lastRow][state.move.lastIndex] = {name: null, color: null, number: null};
					state.board[position[0]][position[1]] = state.move.figure;
					return state;
				});
				if (this.state.move.row !== null) {
					console.log('Write history with');
					console.log(this.state.move);
					this.writeHistory();
				}
			} else {
				this.catchFigure(figure, position);
			}
		}
	}


	render () {
		if (this.state.players[0].name === '') {
			return <Start getPlayers={this.getPlayers.bind(this)} />;
		} else {
			return (
            <> <Board move={(event) => this.move(event)} rows={this.state.board} />
            <History history={this.state.history} /> 
            </>
			);
		}
	}
}

export default App;