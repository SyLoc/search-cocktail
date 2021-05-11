import React, { useState } from 'react';
import Cocktail from '../components/Cocktail';
import {Link} from 'react-router-dom'
import TodoList from '../components/TodoList'

// const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='



const User = () => {
  const [favCocktails, setFavCocktails] = useState([])
  const [todo, setTodo] = useState(false)

  // const ref = firebase.firestore().collection("favorite")
  return (
    <section>
      <button type='button' style={{margin:'2rem'}} onClick={()=>setTodo(!todo)} className='btn'>Todo list</button>
      {todo && <TodoList/>}
      {/* <h2 className='section-title'>your favorite cocltails:</h2> */}
    </section>
  );
};


export default User;