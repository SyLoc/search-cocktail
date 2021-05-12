import React from 'react';
import { Link } from 'react-router-dom'
import logo  from '../logo.svg'
import {useGlobalContext} from '../context'
// import {FaCartPlus} from 'react-icons/fa'
import {FiLogIn , FiLogOut} from 'react-icons/fi'




const Navbar = () => {
  const {user,setUser,checkLogin, setCheckLogin} = useGlobalContext()
 
  const logOut = () =>{
    setCheckLogin(false)
    localStorage.removeItem('login')
    setUser({id:"", name:"", email:""})
  }

  return (
    <nav className='navbar'>
      <div className="nav-center">
        <Link to='/'>
        <img className='logo' src={logo} alt="logo"/>
        </Link>
        <ul className='nav-links'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            {checkLogin ? <Link style={{color:"red", fontWeight:600}} to='/user'>{user.name}</Link> : null} 
          </li>
          <li>
            {checkLogin ? <Link to='/' onClick={logOut} ><FiLogOut/></Link> : <Link to='/login' ><FiLogIn/></Link>}
          </li>
        </ul>
      </div>
    </nav>
  );
};


export default Navbar;