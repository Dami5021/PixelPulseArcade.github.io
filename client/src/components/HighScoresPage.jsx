import {Button, Card, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import ScoresTable from "./ScoresTable.jsx";
import {useEffect, useState} from "react";
import axios from 'axios'
import {useGames} from "../contexts/GamesContext.jsx";
import {forEach} from "react-bootstrap/ElementChildren";

//TODO: Get these scores using context, pass in the requested game
//TODO: The scores should be pre-sorted for ranking. Make a new db function for that
export default function HighScoresPage(props){
    // const [tables, setTables] = useState([]);
    const { getScores, userScores, getGames, currentGames } = useGames();
    const serverRoot = 'http://localhost:3500/';
    const [games, setGames] = useState([])

    // useEffect(() => {
    //     axios.get(serverRoot + 'games')
    //         .then((response) => {
    //             setGames(response.data);
    //         }).catch(error => {
    //             if (error.response){
    //                 console.log("Error with response: " + error.response)
    //             } else if (error.request){
    //                 console.log("Error with request: ")
    //                 console.log(error.request)
    //             } else {
    //                 console.log("Non-axios error")
    //             }
    //     })
    // }, []);


    // useEffect(() => {
    //     getGames().then((response) => {
    //         const games = response.data;
    //         setTables(
    //             games.map(game =>
    //                 <div>
    //                     <h4>{game.name}</h4>
    //                     <ScoresTable game={game} />
    //                 </div>
    //             )
    //         )
    //     })
    // }, []);
    // const games = [
    //     { name: "Lil Game"},
    //     { name: "Tacocats"},
    //     { name: "Whack A Mole"},
    // ]

    // function retrieveScores() {
    //     games.forEach(game => {
    //         let gscores = scores;
    //         getScores(game.name)
    //             .then(data => {
    //                 gscores.push(data);
    //                 setScores(games);
    //             });
    //     })
    //     return scores;
    // }


    const tables = props.games.map(game =>
        <div>
            <h4>{game.name}</h4>
            <ScoresTable game={game} />
        </div>
    );

    return (
        <Container className={'overflow-scroll h-100'}>
        <Card className={"my-5"}>
                <Card.Header as="h3">
                    High Scores
                    <Link to={'/'}>
                        <Button variant="outline-success" className="float-end">Back</Button>
                    </Link>
                </Card.Header>
                <Card.Body>
                    {tables}
                    {/*<h4>Stupid Game</h4>*/}
                    {/*<ScoresTable scores={game1scores}/>*/}
                    {/*<h4>Crate</h4>*/}
                    {/*<ScoresTable scores={scores}/>*/}
                    {/*<h4>Tacocats</h4>*/}
                    {/*<ScoresTable scores={game3scores}/>*/}
                </Card.Body>
            </Card>
        </Container>

    )
}