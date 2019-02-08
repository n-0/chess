import React from 'react';

const history = (props) => {
    const moves = props.history.map((move, index) => {
        let position = `${move.row}${Number(move.index)+1}`;
        let lastPosition = `${move.lastRow}${Number(move.lastIndex)+1}`;
        let catched = (move.catched !== null) ? move.catched.name : '';
        return (
            <tr>
                <td scope="row">{index+1}</td>
                <td>{move.player}</td>
                <td>{move.figure.name}</td>
                <td>{lastPosition}</td>
                <td>{position}</td>
                <td>{catched}</td>
            </tr>
        )
    });
    return (
        <div className="container">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Player</th>
                        <th scope="col">Figure</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                        <th scope="col">Catched</th>
                    </tr>
                </thead>
                <tbody>
                    {moves.reverse().slice(0, 10)}
                </tbody>
            </table>
        </div>
    )
};

export default history;