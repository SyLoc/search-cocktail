import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
//import component
import Navbar from './components/Navbar'
//import pages
import About from './pages/About'
import Home from './pages/Home'
import Error from './pages/Error'
import SingleCocktail from './pages/SingleCocktail'
import Login from './pages/Login'
import User from './pages/User'

const App = () => {
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
        <Route  path='/user'>
          <User/>
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