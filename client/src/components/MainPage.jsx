import {Button, Container, Row} from "react-bootstrap";
import GameCard from "./GameCard.jsx";
import {Link} from "react-router-dom";

//TODO: Read the games from the db for better performance

const games = [
    {
        id:"0",
        name:"Lil Game",
        genre:"Sports",
        desc:"You are the ball.",
        players:"1",
        imageSrc:"/src/assets/stupidgame.png"
    },
    {
        id:"1",
        name:"Crate",
        genre:"Simulation",
        desc:"Watch a crate have a good time.",
        imageSrc:"/src/assets/crate.png"
    },
    {
        id:"2",
        name:"Tacocats",
        genre:"Adventure",
        desc:"Check out some cats.",
        imageSrc:"/src/assets/tacocats.png"
    },
]

export default function MainPage(){
    return(
            <Container className={'overflow-scroll z-0'} >
                <Row className="d-flex justify-content-evenly flex-wrap py-5">
                    {games.map((game, i) =>
                        <GameCard
                            name={game.name}
                            genre={game.genre}
                            desc={game.desc}
                            imageSrc={game.imageSrc}
                            id={game.id}
                            key={i}
                        />
                    )}
                </Row>
                <Row className={"d-none d-lg-flex justify-content-evenly py-5 sticky-bottom"}>
                    <div className={'w-50'}>
                        <Link to={'/highscores'}>
                            <Button variant={"danger"} size={"lg"} className={'w-100'}>
                                <h2 className="mb-0">HIGH SCORES</h2>
                            </Button>
                        </Link>
                    </div>
                </Row>
            </Container>
    )
}