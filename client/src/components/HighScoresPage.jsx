import {Button, Card, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import ScoresTable from "./ScoresTable.jsx";
import {useEffect, useState} from "react";
import axios from 'axios'
import {useGames} from "../contexts/GamesContext.jsx";
import {forEach} from "react-bootstrap/ElementChildren";


const game1scores = [
    {
        rank:"1",
        username:"Ben",
        scorename:"High Score",
        score:"99999",
        date:"03-31-2024"
    },
    {
        rank:"2",
        username:"Benny",
        scoreName:"High Score",
        score:"66669",
        date:"03-22-2024"
    },
    {
        rank:"3",
        username:"Benjamin",
        scoreName:"High Score",
        score:"5555",
        date:"01-22-2024"
    },
    {
        rank:"4",
        username:"Ben Jr",
        scoreName:"High Score",
        score:"999",
        date:"03-31-2024"
    },
    {
        rank:"5",
        username:"Benny",
        scoreName:"High Score",
        score:"666",
        date:"03-22-2024"
    },
    {
        rank:"6",
        username:"Benjamin",
        scoreName:"High Score",
        score:"420",
        date:"01-22-2024"
    },
    {
        rank:"7",
        username:"Ben III",
        scoreName:"High Score",
        score:"99",
        date:"03-31-2024"
    },
    {
        rank:"8",
        username:"Beni",
        scoreName:"High Score",
        score:"69",
        date:"03-22-2024"
    },
    {
        rank:"9",
        username:"Benjammin",
        scoreName:"High Score",
        score:"5",
        date:"01-22-2024"
    },
]

const game2scores = [
    {
        rank:"1",
        username:"Ben",
        scoreName:"Lives Lost",
        score:"0",
        date:"03-31-2024"
    },
    {
        rank:"2",
        username:"Benny",
        scoreName:"Lives Lost",
        score:"3",
        date:"03-22-2024"
    },
    {
        rank:"3",
        username:"Benjamin",
        scoreName:"Lives Lost",
        score:"10000000",
        date:"01-22-2024"
    },
]

const game3scores = [
    {
        rank:"1",
        username:"Ben",
        scorename:"Socks",
        score:"50",
        date:"03-31-2024"
    },
    {
        rank:"2",
        username:"Ben IV",
        scoreName:"Lives Lost",
        score:"30",
        date:"03-22-2024"
    },
    {
        rank:"3",
        username:"Ben Sr",
        scoreName:"Lives Lost",
        score:"4",
        date:"01-22-2024"
    },
]

//TODO: Get these scores using context, pass in the requested game
//TODO: The scores should be pre-sorted for ranking. Make a new db function for that
export default function HighScoresPage(){
    const [scores, setScores] = useState([]);
    const { getScores, userScores, getGames } = useGames();

    // useEffect(() => {
    //     axios.get('http://localhost:3500/scores/game/crate')
    //         .then((response) => {
    //             setScores(response.data)
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

    // const games = getGames();
    const games = [
        { name: "Lil Game"},
        { name: "Tacocats"},
        { name: "Whack A Mole"},
    ]

    function retrieveScores() {
        games.forEach(game => {
            let gscores = scores;
            getScores(game.name)
                .then(data => {
                    gscores.push(data);
                    setScores(games);
                });
        })
        return scores;
    }


    const tables = games.map(game =>
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