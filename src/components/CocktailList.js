import React from 'react';
import Loading from './Loading'
import { useGlobalContext } from '../context'
import Cocktail from './Cocktail'

const CocktailList = () => {
  const {loading, cocktails} = useGlobalContext()

  if(loading){
    return <Loading/>
  }

  if(cocktails.length < 1){
    return (
      <h2 className="section-title">
        no cocktails matched your search criteria
      </h2>
    )
  }

  return (
    <section>
      <h2 className='section-title'>cocktails</h2>
      <div className='cocktails-center'>
        {
          cocktails.map((item, index) => <Cocktail key={index} {...item}/>)
        }
      </div>
    </section>
  );
};

export default CocktailList;