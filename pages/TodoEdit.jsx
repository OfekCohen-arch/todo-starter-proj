import { todoService } from "../services/todo.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { getTodo,saveTodo } from "../store/todo.actions.js"
import { GET_TODO } from "../store/store.js"

const { useState, useEffect } = React
const {useSelector,useDispatch} = ReactRedux
const { useNavigate, useParams } = ReactRouterDOM

export function TodoEdit() {

    const todoToEdit = useSelector((state)=>state.todoToGet)
    const isLoading = useSelector((state)=>state.isLoading)
    const navigate = useNavigate()
    const params = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        if (params.todoId) loadTodo()
    }, [])

    function loadTodo() {
        getTodo(params.todoId)
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }
        dispatch({type:GET_TODO,todoToGet:{ ...todoToEdit, [field]: value }})
     
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        saveTodo(todoToEdit)
        .then((savedTodo) => {
                navigate('/todo')
                showSuccessMsg(`Todo Saved (id: ${savedTodo._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot save todo')
                console.log('err:', err)
            })      
    }

    const { txt, importance, isDone } = todoToEdit
    
    return (
        <section className="todo-edit">
            {
                isLoading? 'Loading...'
                :
                <form onSubmit={onSaveTodo} >
                <label htmlFor="txt">Text:</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />

                <label htmlFor="importance">Importance:</label>
                <input onChange={handleChange} value={importance} type="number" name="importance" id="importance" />

                <label htmlFor="isDone">isDone:</label>
                <input onChange={handleChange} value={isDone} checked={isDone} type="checkbox" name="isDone" id="isDone" />


                <button>Save</button>
            </form>}
        </section>
    )
}