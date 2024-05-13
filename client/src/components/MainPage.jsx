import {Button, Container, Row} from "react-bootstrap";
import GameCard from "./GameCard.jsx";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {serverRoot} from "../endpoints.js";

export default function MainPage(props){

    return(
            <Container className={'overflow-scroll z-0'} >
                <Row className="d-flex justify-content-evenly flex-wrap py-5">
                    {props.games.map((game, i) =>
                        <GameCard
                            name={game.name}
                            genre={game.genre}
                            desc={game.description}
                            type={game.type}
                            imageSrc={game.imageSource}
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
