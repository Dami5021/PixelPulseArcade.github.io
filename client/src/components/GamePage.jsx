import {Unity, useUnityContext} from "react-unity-webgl";
import {useLocation} from "react-router";
import {Container} from "react-bootstrap";
import {useCallback, useEffect, useState} from "react";

//TODO: Stop game when navigating away from this page
//TODO: Get scores from games
export default function GamePage(){

    const location = useLocation();
    const gameType = location.state.slice(-5).toString();
    const gameName = location.state.slice(0, -5).toString();
    const [isGameOver, setIsGameOver] = useState(false);
    const [score, setScore] = useState();
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

    if (gameType === 'unity'){
        return (
            <Container className={'d-flex mx-auto mt-3'} >
                <Unity unityProvider={unityProvider} className={'w-100 h-100 mx-auto'} />
                {isGameOver === true && (
                    <p>{`Game Over! You've scored ${score} points.`}</p>
                )}
            </Container>
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

// function UnityGame(gameName){
//     const [isGameOver, setIsGameOver] = useState(false);
//     const [score, setScore] = useState();
//
//     const { unityProvider, addEventListener, removeEventListener } = useUnityContext({
//         loaderUrl: `/${gameName}/Build/${gameName}.loader.js`,
//         dataUrl: `/${gameName}/Build/${gameName}.data`,
//         frameworkUrl: `/${gameName}/Build/${gameName}.framework.js`,
//         codeUrl: `/${gameName}/Build/${gameName}.wasm`,
//     });
//
//     const handleGameOver = useCallback((score) => {
//         setIsGameOver(true);
//         setScore(score);
//     }, []);
//
//     useEffect(() => {
//         addEventListener("GameOver", handleGameOver);
//         return () => {
//             removeEventListener("GameOver", handleGameOver);
//         };
//     }, [addEventListener, removeEventListener, handleGameOver]);
//
//     return (
//         <Container className={'d-flex mx-auto mt-3'} >
//             <Unity unityProvider={unityProvider} className={'w-100 h-100 mx-auto'} />
//             {isGameOver === true && (
//                 <p>{`Game Over! You've scored ${score} points.`}</p>
//             )}
//         </Container>
//     );
// }
//
// function HTML5Game(gameName){
//     const [isGameOver, setIsGameOver] = useState(false);
//     const [score, setScore] = useState();
//
//     const handleGameOver = useCallback((score) => {
//         setIsGameOver(true);
//         setScore(score);
//     }, []);
//
//     return (
//         <Container className={'d-flex mx-auto mt-3'} >
//             <iframe src={`/${gameName}/index.html`}></iframe>
//         </Container>
//     )
// }