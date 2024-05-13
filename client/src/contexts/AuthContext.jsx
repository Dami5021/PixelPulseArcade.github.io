import React, {useContext, useEffect, useState} from "react"

const loggedOutUser = {
    id:0,
    username: "",
    email: "",
    password: ""
}
const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(
        {
            id: 0,
            username: "Gamer9000",
            email: "gamer@gamer.com",
            password: "gamer"
        }
    )
    // const [loading, setLoading] = useState(true)
    useEffect(() => {
        setCurrentUser(JSON.parse(window.localStorage.getItem("user")));
    }, []);

    useEffect(() => {
        window.localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    function loginUser(user){
        setCurrentUser(user);
    }

    function logoutUser(){
        setCurrentUser(loggedOutUser)
    }

    const value = {
        currentUser,
        loginUser,
        logoutUser,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}