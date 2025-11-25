import { todoService } from "../services/todo.service.js";
import { GET_TODO,ADD_TODO, REMOVE_TODO, SET_TODOS, SET_IS_LOADING, store, UPDATE_TODO,SET_FILTER_BY } from "./store.js"

export function loadTodos(filterBy) {

    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    return todoService.query(filterBy)
        .then(todos => {
            store.dispatch({ type: SET_TODOS, todos })
        })
        .catch(err => {
            console.log('Cannot load todos', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}
export function getTodo(todoId){
store.dispatch({type:SET_IS_LOADING,isLoading: true})
return todoService.get(todoId)
.then((todo)=> store.dispatch({type:GET_TODO,todoToGet: todo}))
.catch(err =>{
    console.log('Cannot load todo',err);
    throw err
})
.finally(()=>{
    store.dispatch({type: SET_IS_LOADING,isLoading: false})
})
}
export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
        })
        .catch(err => {
            console.log('Cannot remove todo', err)
            throw err
        })
}

export function saveTodo(todoToSave) {
    const type = todoToSave._id ? UPDATE_TODO : ADD_TODO

    return todoService.save(todoToSave)
        .then((savedTodo) => {
            store.dispatch({ type, todo: savedTodo })
            return savedTodo
        })
        .catch(err => {
            console.log('Cannot remove todo', err)
            throw err
        })
}
export function setFilterBy(filterByToSave){
const type = SET_FILTER_BY
store.dispatch({type,filterBy: filterByToSave})
}