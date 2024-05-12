import {Table} from "react-bootstrap";
import React, {useEffect} from "react";
import {useGames} from "../contexts/GamesContext.jsx";
import axios from "axios";
import {serverRoot} from "../endpoints.js";

export default function ScoresTable(props){

    if (!props.game){
        return
    }

    const { getScores, currentScores } = useGames();
    const [scores, setScores] = React.useState([]);
    let rows = [];

    // getScores(props.game.name)
    //     .then(promise => {
    //         setScores(currentScores);
    //         scores.forEach((score, idx) => {
    //             rows.push(
    //                 <tr>
    //                     <td>{idx + 1}</td>
    //                     <td>{score.username}</td>
    //                     <td>{score.score}</td>
    //                     <td>{score.date.slice(0, 10)}</td>
    //                 </tr>
    //             )
    //         })
    //     });

    useEffect(() => {
        axios.get(serverRoot + 'scores/game/' + props.game.name)
            .then((response) => {
                setScores(response.data);
            }).catch(error => {
            if (error.response){
                console.log("Error with response: " + error.response)
            } else if (error.request){
                console.log("Error with request: ")
                console.log(error.request)
            } else {
                console.log("Non-axios error")
            }
        })
    }, []);


    scores.sort((a, b) => b.score - a.score).forEach((score, idx) => {
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
                    <th>Score</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </Table>
    )
}