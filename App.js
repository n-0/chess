import React from 'react';
import Board from './board/board';
import Start from './start/start';
import History from './history/history';
import Bootstrap from './css/bootstrap.css';

/*
            board: {
                A: [['Rook', 'black', 1], ['Knight','black', 1], ['Bishop', 'black', 1], 
                ['Queen', 'black', 1], ['King', 'black', 1], ['Bishop', 'black', 2], ['Knight', 'black', 2], ['Rook', 'black', 2]],
                B: [['Pawn', 'black', 1], ['Pawn', 'black', 2], ['Pawn', 'black', 3], ['Pawn', 'black', 4], ['Pawn', 'black', 5], 
                ['Pawn', 'black', 6], ['Pawn', 'black', 7], ['Pawn', 'black', 8]], 
                C: new Array(8).fill([0, 2, 0]),
                D: new Array(8).fill([0, 2, 0]),
                E: new Array(8).fill([0, 2, 0]),
                F: new Array(8).fill([0, 2, 0]),
                G: [['Pawn', 'white', 1], ['Pawn', 'white', 2], ['Pawn', 1, 3], ['Pawn', 'white', 4], ['Pawn', 'white', 5], 
                ['Pawn', 'white', 6], ['Pawn', 'white', 7], ['Pawn', 'white', 8]], 
                H: [['Rook', 'white', 1], ['Knight','white', 1], ['Bishop', 'white', 1], 
                ['Queen', 'white', 1], ['King', 'white', 1], ['Bishop', 'white', 2], ['Knight', 'white', 2], ['Rook', 'white', 2]],
            }, 
*/


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
  
    letterToIndex = (letter) => {
        return Object.keys(this.state.board).indexOf(letter);
    }

    pawnMove = (move) => {
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

    rookMove = (move) => {
        if (
            ((move.lastIndex !== move.index) && (move.lastRow === move.row))
            || ((move.lastIndex === move.index) && (move.lastRow !== move.row)) 
        ) {
            return true;
        }
        return false;
    }

    bishopMove = (move) => {
        if (Math.abs(move.lastIndex - move.index) === Math.abs(this.letterToIndex(move.lastRow) - this.letterToIndex(move.row))) {
            return true;
        }
        return false;
    }

    knightMove = (move) => {
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

    kingMove = (move) => {
        if (
            ((Math.abs(move.lastIndex - move.Index) === 1)
            && ((move.lastRow === move.row) || (Math.abs(this.letterToIndex(move.lastRow) - this.letterToIndex(move.row)) === 1)))
            || ((move.lastIndex === move.index) && (Math.abs(this.letterToIndex(move.lastRow) - this.letterToIndex(move.row)) !== 1))
        ) {
            return true;
        }
        return true;
    }
    
    queenMove = (move) => {
        this.pawnMove(move);
        this.rookMove(move)
    }

    checkMove = (move) => {
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

    getPlayers = (players) => {
        this.setState({
            players: players});
    }
    
    getRowLetter = (index) => {
        return Object.keys(this.state.board)[index];
    }


    catchFigure = (catched, position) => {
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

    writeHistory = () => {
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

    
    move = (event) => {
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
                }
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

    /*
    move = (event) => {
        let position = []; //[row, index]
        let field = event.target;
        let figureClass = field.getAttribute('figure'); //!current click figure
        figureClass = figureClass.split(':');
        figureClass = {
            name: figureClass[0],
            color: figureClass[1],
            number: figureClass[2],
        };
        if (figureClass.name === 'empty') { //empty field gets a number as string in format rowindex
            if (this.state.move.figure.name === null) {
                return;
            } else {
                position = figureClass.split('');
                position = position.map((value) => Number(value));
            }
        } else {
            figureClass.number = Number(figureClass.number);
            position[0] = Object.keys(this.state.board).findIndex((value) => {
                for (let index in this.state.board[value]) {
                    let figure = this.state.board[value][index];
                    if (figure.name === figureClass.name && figure.color === figureClass.color && figure.number === figureClass.number) {
                        return true;
                    }
                }
            });
            position[1] = this.state.board[this.getRowLetter(position[0])].findIndex((figure) => {
                    if (figure.name === figureClass.name && figure.color === figureClass.color && figure.number === figureClass.number) {
                        return true;
                    }
            });
        }
        let figure = this.state.board[this.getRowLetter(position[0])][position[1]]; 
        if (this.state.move.figure.name === null) {
            this.setState((state) => {
//                state.move = [position[0], position[1], figure];
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
                }
                return state;
            });
        } else {
            if (figure.name !== null) {
                this.catchFigure(figure, position);
            } else {
                this.setState((state) => {
                const rowLetter = this.getRowLetter(state.move.lastRow);
                //const lastIndex = state.move[1]
                //const lastIndex = state.board[rowLetter].findIndex((field) => {if (field[0] == state.move[1]) return true});
                state.move = {
                    row: position[0],
                    index: position[1],
                }
                state.board[rowLetter][state.move.lastIndex] = {name: null, color: null, number: null};
                state.board[this.getRowLetter(position[0])][position[1]] = state.move.figure;
                return state;
                });
                this.writeHistory()
            }
        }
    }
    */

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