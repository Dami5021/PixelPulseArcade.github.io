import {Unity, useUnityContext} from "react-unity-webgl";
import {useLocation} from "react-router";
import {Button, Container, Row} from "react-bootstrap";
import {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

//TODO: Get scores from games
export default function GamePage(){

    const location = useLocation();
    const gameType = location.state.slice(-5).toString();
    const gameName = location.state.slice(0, -5).toString();
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState();
    const { unityProvider, addEventListener, removeEventListener, unload } = useUnityContext({
        loaderUrl: `/${gameName}/Build/${gameName}.loader.js`,
        dataUrl: `/${gameName}/Build/${gameName}.data`,
        frameworkUrl: `/${gameName}/Build/${gameName}.framework.js`,
        codeUrl: `/${gameName}/Build/${gameName}.wasm`,
    });
    const navigate = useNavigate();

    async function handleClickBack() {
        await unload();
        navigate('/');
    }

    const handleGameOver = useCallback((score) => {
        setIsGameOver(true);
        setScore(score);
    }, []);

    useEffect(() => {
        addEventListener("GameOver", handleGameOver);
        return () => {
            removeEventListener("GameOver", handleGameOver);
        };
    }, [addEventListener, removeEventListener, handleGameOver]);

    if (gameType === 'unity'){
        return (
            <>
                <Container className={'d-flex mx-auto mt-3'} >
                    <Unity unityProvider={unityProvider} className={'w-100 h-100 mx-auto'} />

                </Container>
                <Container className={'mx-auto'}>
                    <Row className="justify-content-center">
                        {isGameOver === true && (
                            <p>{`Game Over! You've scored ${score} points.`}</p>
                        )}
                        <Button variant={'danger'} className={'mt-5 w-50'} onClick={handleClickBack}>End Game</Button>
                    </Row>
                </Container>
            </>

        )
    } else if (gameType === 'html5'){
        return (
            <Container className={'d-flex mx-auto mt-3 w-100 h-100'} >
                <iframe
                    src={`/${gameName}/index.html`}
                    height={'75%'}
                    width={'100%'}
                ></iframe>
            </Container>
        )
    } else {
        return <Container className={'d-flex mx-auto mt-3'} >Invalid game type!</Container>
    }
}
