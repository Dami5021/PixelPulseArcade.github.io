
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainPage from "./components/MainPage.jsx";
import SettingsPage from "./components/SettingsPage.jsx";
import TopBar from "./components/TopBar.jsx";
import HighScoresPage from "./components/HighScoresPage.jsx";
import Login from "./components/Login.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import SignUp from "./components/SignUp.jsx";
import GamePage from "./components/GamePage.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import {GamesProvider} from "./contexts/GamesContext.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {serverRoot} from "./endpoints.js";
import {forEach} from "react-bootstrap/ElementChildren";
import Messages from "./components/Messages.jsx";

//TODO: Add private route for MainPage after Login is implemented?

let gameScores = [];
function App() {
    const [games, setGames] = useState([]);
    const [user, setUser] = useState("Gamer9000");

    useEffect(() => {
        axios.get(serverRoot + 'games')
            .then((response) => {
                setGames(response.data);
            }).catch(error => {
            if (error.response){
                console.log("Error with response: " + error.response)
            } else if (error.request){
                console.log("Error with request: ")
                console.log(error.request)
            } else {
                console.log("Non-axios error")
            }
        })
    }, []);

    // games.forEach(game => {
    //     getScores(game.name);
    // })
    //
    // function getScores(game){
    //     useEffect(() => {
    //         axios.get(serverRoot + 'scores/game/' + game)
    //             .then((response) => {
    //                 gameScores.push(response.data);
    //                 setScores(gameScores);
    //             }).catch(error => {
    //             if (error.response){
    //                 console.log("Error with response: " + error.response)
    //             } else if (error.request){
    //                 console.log("Error with request: ")
    //                 console.log(error.request)
    //             } else {
    //                 console.log("Non-axios error")
    //             }
    //         })
    //     }, []);
    // }




  return (
    <Router>
        <AuthProvider>
            <GamesProvider>
                <TopBar user={user} setUser={setUser} />
                <Routes>
                    <Route exact path="/" element={<MainPage games={games} />} />
                    <Route path="/login" element={<Login setUser={() => setUser} />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/game" element={<GamePage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/highscores" element={<HighScoresPage games={games} />} />
                    <Route path="/messages" element={<Messages user={user} />} />
                </Routes>
            </GamesProvider>
        </AuthProvider>
    </Router>
  )
}

export default App

