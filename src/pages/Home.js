import React from 'react';
import SearchForm from '../components/SearchForm';
import CocktailList from '../components/CocktailList';
import {useGlobalContext} from '../context'

const Home = () => {
  const {checklLogin} = useGlobalContext()
  if(checklLogin){
    console.log("logined")
  }
  return (
    <main>
      <SearchForm/>
      <CocktailList/>
    </main>
  );
};


export default Home;