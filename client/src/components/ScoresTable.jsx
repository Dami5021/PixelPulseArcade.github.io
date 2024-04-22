import {Table} from "react-bootstrap";

export default function ScoresTable(props){

    if (!props.scores.length){
        return
    }

    let rows = []
    props.scores.forEach((score, idx) => {
        rows.push(
            <tr>
                <td>{idx + 1}</td>
                <td>{score.username}</td>
                <td>{score.score}</td>
                <td>{score.date.slice(0, 10)}</td>
            </tr>
        )
    })

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>{props.scores[0].scorename}</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    )
}