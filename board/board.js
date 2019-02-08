import React from 'react';
import './board.css';

const chessUnicodes = {
    'Kingwhite': '♔',
    'Queenwhite': '♕',
    'Rookwhite': '♖',
    'Bishopwhite': '♗',
    'Knightwhite': '♘',
    'Pawnwhite': '♙',
    'Kingblack': '♚',
    'Queenblack': '♛',
    'Rookblack': '♜',
    'Bishopblack': '♝',
    'Knightblack': '♞',
    'Pawnblack': '♟',
    'empty': '_',
}

const board = (props) => {
    let board = Object.keys(props.rows).map((row, rowIndex) => {
        let fields = props.rows[row].map((field, index) => {
            let colorClass;
            if (rowIndex % 2 === 0) {
                if (index % 2 === 0) {
                    colorClass = 'white';
                } else {
                    colorClass = 'black';
                }
            } else {
                if (index % 2 === 0) {
                    colorClass = 'black';
                } else {
                    colorClass = 'white';
                }
            }
            let classOfField = `field square col ${colorClass}`;
            let figure;
            let htmlFigure;
            if (field.name === null) {
                figure = `empty:empty:${rowIndex}${index}`;
                htmlFigure = chessUnicodes['empty'];
            } else {
                figure = `${field.name}:${field.color}:${field.number}`; //field = name color number 
                htmlFigure = chessUnicodes[''+ field.name + field.color];
            }
            let key = `${row}:${index}`;
            return (
            <div className={classOfField}
            key={key}
            onClick={props.move} 
            position={key}
            figure={figure}>{htmlFigure}</div>);
        });
        return <div className="row" key={row}>{fields}</div>;
    });
    return <div className="container-fluid">{board}</div>;
};

export default board;
