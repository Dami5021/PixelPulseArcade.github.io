import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Accordion} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function GameCard(props) {
    const pathName = props.name.replace(/\s+/g, '')
    return (
        <Card style={{ width: '15rem' }} className={"m-2 p-1"}>
            <Link to={'/game'} state={pathName}>
                <Card.Img className="img-fluid border border-2" variant="top" src={props.imageSrc} />
            </Link>
            <Card.Body>
                <Accordion>
                    <Accordion.Item eventKey={props.id}>
                        <Accordion.Header><h5 className={'mb-0'}>{props.name}</h5></Accordion.Header>
                        <Accordion.Body>
                            <p><em>{props.genre}</em></p>
                            <p>{props.desc}</p>
                            <Link to={'/game'} state={pathName}>
                                <Button variant="success">Play!</Button>
                            </Link>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </Card.Body>
        </Card>
    );
}