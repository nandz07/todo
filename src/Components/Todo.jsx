import React, { useEffect, useRef, useState } from 'react'
import './Todo.css'
// import {IoMdDoneAll} from 'react-icon/io'
// import {FiEdit} from 'react-icon/fi'
// import {MdDelete} from 'react-icon/md'
import { IoMdDoneAll } from 'react-icons/io';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';

function Todo() {
    const [todo, setTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [editId, setEditId] = useState(0)
    const handleSubmit = (e) => {
        e.preventDefault()
        if(todo.trim('') !==''){
            setTodos([...todos, {list : todo, id: Date.now(), status: false }]);
            setTodo('')
            console.log(todos)
        }else{
            alert(`You can't add empty value`)
            setTodo('')
        }
        if(editId){
            const editTodo = todos.find((todo)=>todo.id===editId)
            const updateTodo =todos.map((to)=>to.id===editTodo.id
            ?(to={id:to.id,list:todo})
            :(to={id:to.id,list:to.list}))
            setTodos(updateTodo)
            setEditId(0)
            setTodo('')
        }
    }

    const inputRef = useRef('')
    useEffect(() => {
        inputRef.current.focus()
    })
    const onDelete = (index) => {
        setTodos(
            todos.filter((_, i) => i !== index)
        )
    }
    const onComplete = (id)=>{
        
        let complete = todos.map((item)=>{
            if (item.id === id){
                return ({...item, status : !item.status})
            }
            return item
        } )
        setTodos(complete)
        // console.log(todos)
      }
      const onEdit=(id)=>{
        let editTodo=todos.find((to)=>id=== to.id )
        setTodo(editTodo.list)
        setEditId(editTodo.id)
      }

    return (
        <div className='container'>
            <h2>TODO APP</h2>
            <form action="" className='form-group' onSubmit={handleSubmit}>
                <input type="text" value={todo} ref={inputRef} name="" id="" placeholder='Enter your todo' className='form-control' onChange={(event) => setTodo(event.target.value)} />
                <button className='addBtn'>{editId?'EDIT':'ADD'}</button>
            </form>
            <div>
                <ul>
                    {
                        todos.map((value, index) => {
                            return <li className='list-items' key={index}>
                                <div className="" id={value.status ? 'list-item' : ''}>{value.list}</div>

                                <span>
                                    <IoMdDoneAll className='list-item-icons' id='complete' title='Complete' onClick={() => { onComplete(value.id) }} />
                                    <FiEdit className='list-item-icons' id='edit' title='Edit' onClick={()=>onEdit(value.id)}  />
                                    <MdDelete className='list-item-icons' id='delete' title='Delete' onClick={() => onDelete(index)} />
                                </span> </li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default Todo