import React, { useEffect, useReducer, useState } from 'react';
import {reducer} from '../Reducer/reducer'
import './TodoList.css'
import {MdDelete} from 'react-icons/md'
import {FaRegEdit} from'react-icons/fa'

  let initialState = {
    data:[],
    isShowNotice: false,
    content:'',
    isEditing:false,
    editID:''
  }

const TodoList = () => {
  const [state, dispatch] = useReducer(reducer,initialState)
  const [name, setName] = useState('')

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!name){
      dispatch({type:'NO_VALUE'})
    }
    else{
      if(name && state.isEditing){
        const newValue = state.data.map((item) => {
          if(item.id === state.editID){
            return {...item, name:name}
          }
          return item
        })
        dispatch({type: 'CHANGE_VALUE', payload:newValue})
        setName('')
      }
      else{
        const newItem = {
          id: new Date().getTime().toString(),
          name: name
        }
        dispatch({type:'ADD_ITEM', payload:newItem})
        setName('')
      }
    }
    
  }

  useEffect(() => {
    dispatch({type: 'LOADING_DATA'})
  }, []);

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(state.data))
  }, [state.data]);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      dispatch({type:'OFF_SHOW'})
    }, 3000);
    return () => clearTimeout(timeOut)
  }, [state.isShowNotice]);

  const Edit = (id) =>{
    const specificItem = state.data.find((item) => item.id === id)
    state.isEditing = true
    state.editID = specificItem.id
    setName(specificItem.name)
  }

  return (
    <>
      <section className="section-center">
        {
          state.isShowNotice && <p className='add-item'>{state.content}</p>
        }
        <form onSubmit={handleSubmit}>
          <div>
            <input 
              type="text"
              value={name}
              placeholder='Enter todo...'
              onChange={(e) => setName(e.target.value)}
              />
          </div>
          <button type='submit' className="btn btn-primary">{state.isEditing ? 'edit': 'add'}</button>
        </form>
      </section>
      { state.data.length > 0 && <button type='button' className='btn btn-clear' onClick={() =>
       dispatch({type: 'CLEAR_ALL'})
      }>clear all</button> }
      { state.data.map((item) =>{
        const {id, name} = item
        return (
          <div key={id} className="item">
            <h4>{name}</h4>
            <div>
              <button onClick={() => Edit(id)}><FaRegEdit/></button>
              <button onClick={() => dispatch({type:'REMOVE', payload:id})}><MdDelete/></button>
            </div>
          </div>
        );
      })}
    </>
  );
};



export default TodoList;