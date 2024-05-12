import React, {createContext, useContext, useEffect, useState} from "react";
import axios from "axios";

const GamesContext = createContext();
const serverRoot = 'http://localhost:3500/';

export function useGames(){
    return useContext(GamesContext);
}

export const GamesProvider = ({ children }) => {

    const [currentGame, setCurrentGame] = useState()
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

    function getGame(gameID){
        return axios.get(`${serverRoot}games/${gameID}`)
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

    function getGames() {
        return axios.get(`${serverRoot}games`)
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

    let value = {
        currentGame,
        setCurrentGame,
        currentScores,
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