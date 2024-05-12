import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

const GamesContext = createContext();
const serverRoot = 'http://localhost:3500/';

export function useGames(){
    return useContext(GamesContext);
}

export const GamesProvider = ({ children }) => {

    const [currentGames, setCurrentGames] = useState()
    const [currentScores, setCurrentScores] = useState()
    const [loading, setLoading] = useState(false)

    function getScores(game){
        return useEffect(() => {
            axios.get(`${serverRoot}scores/game/${game}`)
                .then(response => setCurrentScores(response.data))
                .catch(error => {
                    if (error.response) {
                        console.log("Error with response: " + error.response)
                    } else if (error.request) {
                        console.log("Error with request: ")
                        console.log(error.request)
                    } else {
                        console.log("Non-axios error")
                    }
                });
        }, []);

    }

    function addScore(score){
        return axios.post(`${serverRoot}scores`, {score})
            .then(response => true)
            .catch(error =>
                {
                    if (error.response) {
                        console.log("Error with response: " + error.response)
                    } else if (error.request) {
                        console.log("Error with request: ")
                        console.log(error.request)
                    } else {
                        console.log("Non-axios error")
                    }
                }
            )
    }

    function userScores(user) {
        return axios.get(`${serverRoot}scores/username/${user}`)
            .then(response => response.data)
            .catch(error => {
                if (error.response) {
                    console.log("Error with response: " + error.response)
                } else if (error.request) {
                    console.log("Error with request: ")
                    console.log(error.request)
                } else {
                    console.log("Non-axios error")
                }
            })
    }

    function getGameID(gameID){
        useEffect(() => {
            axios.get(`${serverRoot}games/id/${gameID}`)
                .then(response => setCurrentGame(response.data))
                .catch(error => {
                    if (error.response) {
                        console.log("Error with response: " + error.response)
                    } else if (error.request) {
                        console.log("Error with request: ")
                        console.log(error.request)
                    } else {
                        console.log("Non-axios error")
                    }
                })
        }, []);
    }

    function getGame(gameName){
        useEffect(() => {
            axios.get(`${serverRoot}games/name/${gameName}`)
                .then(response => response.data)
                .catch(error => {
                    if (error.response) {
                        console.log("Error with response: " + error.response)
                    } else if (error.request) {
                        console.log("Error with request: ")
                        console.log(error.request)
                    } else {
                        console.log("Non-axios error")
                    }
                })
        }, []);
    }

    function getGames() {
        let games = [];
        useEffect(() => {
            axios.get(`${serverRoot}games`)
                .then(response => games = response.data)
                .catch(error => {
                    if (error.response) {
                        console.log("Error with response: " + error.response)
                    } else if (error.request) {
                        console.log("Error with request: ")
                        console.log(error.request)
                    } else {
                        console.log("Non-axios error")
                    }
                })
        }, []);

        return games;
    }

    let value = {
        currentScores,
        currentGames,
        getScores,
        addScore,
        userScores,
        getGame,
        getGames
    }

    return (
        <GamesContext.Provider value={value}>
            {children}
        </GamesContext.Provider>
    )
}