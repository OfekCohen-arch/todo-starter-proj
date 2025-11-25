const { useState } = React
const { Link, NavLink } = ReactRouterDOM
const { useNavigate } = ReactRouter
const {useSelector,useDispatch} = ReactRedux

import { UserMsg } from "./UserMsg.jsx"
import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import {logout} from '../store/user.actions.js'

export function AppHeader() {
    const navigate = useNavigate()
    const loggedinUser = useSelector((state)=>state.loggedinUser)
    const dispatch = useDispatch()
    function onLogout() {
        logout()
            .then(() => {
              showSuccessMsg('You logged out')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }
   function getDoneTodosPrecents(){
    const todos = useSelector((state)=>state.todos)
    const doneTodosNumber = todos.filter(todo=>todo.isDone).length
    const doneTodosPrecent = doneTodosNumber/todos.length * 100
    return JSON.stringify(doneTodosPrecent).substring(0,4)
   }
    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <h1>React Todo App</h1>
                <span>Done todos: {getDoneTodosPrecents()}%</span>
                <progress  value={getDoneTodosPrecents()} max="100"></progress>
                {loggedinUser ? (
                    < section >

                        <Link to={`/user/${loggedinUser._id}`}>Hello {loggedinUser.fullname}</Link>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup  />
                    </section>
                )}
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
                
            </section>
            <UserMsg />
        </header>
    )
}
