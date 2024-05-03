import React, { useContext, useState, useEffect } from "react"
import axios from 'axios'

const AuthContext = React.createContext()
const hasValue = (obj, value) => Object.values(obj).includes(value);
const serverRoot = 'http://localhost:3500/'

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        if (!userExists(email)){
            return false
        } else {
            axios.post(serverRoot + '/users', {
                email: email,
                password: password,
            })
                .then(function (response) {
                    return true
                })
                .catch(function (error) {
                    console.log(error);
                });
            return false
        }
    }

    function login(email, password) {
        if (!userExists(email)){
            return false
        } else {
            return passwordCorrect(email, password);
        }
    }

    function logout() {
        setCurrentUser(null)
    }

    function resetPassword() {
        //TODO: send password reset email?
    }

    function updateEmail(email) {
        const updates = {
            email: email,
            password: currentUser.password
        }
        return updateUser(updates, currentUser.id);
    }

    function updatePassword(password) {
        const updates = {
            email: currentUser.email,
            password: password
        }
        return updateUser(updates, currentUser.id);
    }

    function deleteUser() {
        axios.delete(serverRoot + '/users/:' + id, )
            .then(function (response) {
                return true
            })
            .catch(function (error) {
                console.log(error);
            });
        return false
    }

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //         setCurrentUser(user)
    //         setLoading(false)
    //     })
    //
    //     return unsubscribe
    // }, [])

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,
        deleteAccount
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

function userExists(email){
    useEffect(() => {
        axios.get(serverRoot + 'users')
            .then((response) => {
                let users = response.data;
                return hasValue(users, email);
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
    return false
}

function passwordCorrect(email, password) {
    return false
}

function updateUser(id, updates){
    axios.patch(serverRoot + '/users/:' + id, {
        email: updates.email,
        password: updates.password,
    })
        .then(function (response) {
            return true
        })
        .catch(function (error) {
            console.log(error);
        });
    return false
}