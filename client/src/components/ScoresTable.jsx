import {Table} from "react-bootstrap";

export default function ScoresTable(props){

    if (!props.scores.length){
        return
    }

    let rows = []
    for(let score of props.scores){
        rows.push(
            <tr>
                <td>{score.rank}</td>
                <td>{score.username}</td>
                <td>{score.score}</td>
                <td>{score.date}</td>
            </tr>
        )
    }
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>{props.scoreName}</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    )
}