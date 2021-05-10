import React, { useState } from 'react';
import Cocktail from '../components/Cocktail';
import firebase from "../firebase";

// const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i='



const User = () => {
  const [favCocktails, setFavCocktails] = useState([])

  // const ref = firebase.firestore().collection("favorite")
  return (
    <section>
      <h2 className='section-title'>your favorite cocltails:</h2>
      <div className='cocktails-center'>
        {
          favCocktails.map((item, index) => <Cocktail key={index} {...item}/>)
        }
      </div>
    </section>
  );
};


export default User;