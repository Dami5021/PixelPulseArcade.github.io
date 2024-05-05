import {Unity, useUnityContext} from "react-unity-webgl";
import {useLocation} from "react-router";
import {Container} from "react-bootstrap";
import {useCallback, useEffect, useState} from "react";

//TODO: Allow for non-unity games to be passed in
//TODO: Get scores from games
export default function GamePage(){
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState();
    const location = useLocation()
    const gameName = location.state
    const { unityProvider, addEventListener, removeEventListener } = useUnityContext({
        loaderUrl: `/${gameName}/Build/${gameName}.loader.js`,
        dataUrl: `/${gameName}/Build/${gameName}.data`,
        frameworkUrl: `/${gameName}/Build/${gameName}.framework.js`,
        codeUrl: `/${gameName}/Build/${gameName}.wasm`,
    });

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

    return (
        <Container className={'d-flex mx-auto mt-3'} >
            <Unity unityProvider={unityProvider} className={'w-100 h-100 mx-auto'} />
            {isGameOver === true && (
                <p>{`Game Over! You've scored ${score} points.`}</p>
            )}
        </Container>
    );
}