import {Table} from "react-bootstrap";
import React from "react";
import {useGames} from "../contexts/GamesContext.jsx";

export default function ScoresTable(props){

    if (!props.game){
        return
    }

    const { getScores, currentScores } = useGames();
    const [scores, setScores] = React.useState([]);
    let rows = [];

    getScores(props.game.name)
        .then(promise => {
            setScores(currentScores);
            scores.forEach((score, idx) => {
                rows.push(
                    <tr>
                        <td>{idx + 1}</td>
                        <td>{score.username}</td>
                        <td>{score.score}</td>
                        <td>{score.date.slice(0, 10)}</td>
                    </tr>
                )
            })
        });



    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>{scores[0].scorename}</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    )
}