import {Button, Card, Container} from "react-bootstrap";
import {Link} from "react-router-dom";
import ScoresTable from "./ScoresTable.jsx";

export default function HighScoresPage(props){

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
                </Card.Body>
            </Card>
        </Container>

    )
}