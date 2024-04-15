import {Button, Card, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import ScoresTable from "./ScoresTable.jsx";

//TODO: Get scores from db using context
const game1scores = [
    {
        rank:"1",
        username:"Ben",
        scoreName:"High Score",
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
        scoreName:"Socks",
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
export default function HighScoresPage(){

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
                    <h4>Stupid Game</h4>
                    <ScoresTable scores={game1scores} scoreName={game1scores[0].scoreName}/>
                    <h4>Crate</h4>
                    <ScoresTable scores={game2scores} scoreName={game2scores[0].scoreName}/>
                    <h4>Tacocats</h4>
                    <ScoresTable scores={game3scores} scoreName={game3scores[0].scoreName}/>
                </Card.Body>
            </Card>
        </Container>

    )
}