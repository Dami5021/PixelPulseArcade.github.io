import React, {useContext, useState} from "react"
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

    function signup(username, name, email, password) {
        axios.post(serverRoot + 'users', {
            username: username,
            name: name,
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

    function login(email, password) {
        // return axios.get(serverRoot + 'users')
        //     .then((response) => {
        //         let users = response.data;
        //         for (const user of users) {
        //             if (hasValue(user, email)) {
        //                 if (user.password === password){
        //                     setCurrentUser(user)
        //                     return true;
        //                 }
        //             }
        //         }
        //     }).catch(error => {
        //         if (error.response) {
        //             console.log("Error with response: " + error.response)
        //         } else if (error.request) {
        //             console.log("Error with request: ")
        //             console.log(error.request)
        //         } else {
        //             console.log("Non-axios error")
        //         }
        //     });
        let userPassword = axios.get(serverRoot + 'users/:' + email)
            .then((response) => {
                return response.data;
            }).catch(function (error) {
                console.log(error);
                return null
            });
        return userPassword === password;
    }

    function logout() {
        setCurrentUser(null)
    }

    function resetPassword() {
        //TODO: send password reset email?
    }

    function updateEmail(email) {
        const updates = {
            username: currentUser.username,
            name: currentUser.name,
            email: email,
            password: currentUser.password
        }
        return updateUser(updates, currentUser.id);
    }

    function updatePassword(password) {
        const updates = {
            username: currentUser.username,
            name: currentUser.name,
            email: currentUser.email,
            password: password
        }
        return updateUser(updates, currentUser.id);
    }

    function deleteUser() {
        axios.delete(serverRoot + 'users/:' + currentUser.id, )
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
        deleteUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

function userExists(email){
    return axios.get(serverRoot + 'users')
        .then((response) => {
            let users = response.data;
            for (const user of users) {
                if (hasValue(user, email)) {
                    return true;
                }
            }
        }).catch(error => {
            if (error.response) {
                console.log("Error with response: " + error.response)
            } else if (error.request) {
                console.log("Error with request: ")
                console.log(error.request)
            } else {
                console.log("Non-axios error")
            }
        });
}

function passwordCorrect(email, password) {

}

function updateUser(id, updates){
    axios.patch(serverRoot + 'users/:' + id, {
        username: updates.username,
        name: updates.name,
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