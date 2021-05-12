import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
//import component
import Navbar from './components/Navbar'
//import pages
import About from './pages/About'
import Home from './pages/Home'
import Error from './pages/Error'
import SingleCocktail from './pages/SingleCocktail'
import Login from './pages/Login'
import User from './pages/User'

// global 
import {useGlobalContext} from './context'

const App = () => {
  const {checkLogin} = useGlobalContext()
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path='/'>
          <Home/>
        </Route>
        <Route  path='/about'>
          <About/>
        </Route>
        <Route  path='/user' render={() =>{
          return checkLogin ? <User/> : <Redirect to='/login'/>
        }} >
        </Route>
        <Route  path='/login'>
          <Login/>
        </Route>
        <Route  path='/cocktail/:id'>
          <SingleCocktail/>
        </Route>
        <Route  path='*'>
          <Error/>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;