import {Unity, useUnityContext} from "react-unity-webgl";
import {useLocation} from "react-router";
import {Container} from "react-bootstrap";

export default function GamePage(){
    const location = useLocation()
    const gameName = location.state
    const { unityProvider } = useUnityContext({
        loaderUrl: `/${gameName}/Build/${gameName}.loader.js`,
        dataUrl: `/${gameName}/Build/${gameName}.data`,
        frameworkUrl: `/${gameName}/Build/${gameName}.framework.js`,
        codeUrl: `/${gameName}/Build/${gameName}.wasm`,
    });

    return (
        <Container className={'d-flex mx-auto mt-3'} >
            <Unity unityProvider={unityProvider} className={'w-100 h-100 mx-auto'} />
        </Container>
    );
}