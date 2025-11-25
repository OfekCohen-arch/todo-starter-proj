import { userService } from "../services/user.service.js"
import {SET_USER, store } from "./store.js"

export function login(credentials) {

    return userService.login(credentials)
        .then(loggedinUser => {
            store.dispatch({ type: SET_USER, loggedinUser })
        })
        .catch(err => {
            throw err
        })
}

export function signup(credentials) {

    return userService.signup(credentials)
        .then(loggedinUser => {
            store.dispatch({ type: SET_USER, loggedinUser })
        })
        .catch(err => {
            throw err
        })
}

export function logout() {

    return userService.logout()
        .then(() => {
            store.dispatch({ type: SET_USER, loggedinUser: null })
        })
        .catch(err => {
            throw err
        })
}
export function addBalance(){
    return userService.updateBalance(10)
    .then((balance)=>{
     const userToSave = {...userService.getLoggedinUser(),balance:balance}
     store.dispatch({type: SET_USER, loggedinUser: userToSave})
    })
}
