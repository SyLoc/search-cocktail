// de choi vui thoi, ko lam gi ca

import React, {useState} from 'react';
import './FormLogin.css'
import {Link} from 'react-router-dom'
import firebase from "../firebase";


const FormSignUp = () => {
  const [details, setDetails] = useState({name:'', email:'', password:'', googleId:'', loginByGoogle: false})
  const [error,setError] = useState("")
  const ref = firebase.firestore().collection("users")

  const refresh = React.createRef('')


  const handleSubmit = (e) =>{
    e.preventDefault()
    SignUp(details)
    refresh.current.click()
  }

  const addUser = (newUser) =>{
    ref
      .doc(newUser.id)
      .set(newUser)
      .catch((error) => console.log(error))
  }

  const SignUp = (details) =>{
    if(details.name === "" || details.email === ""|| details.password === ""){
      setError('Please fill it out completely')
    }
    else{
      if(details.password.length < 6){
        setError('Please enter a password of 6 characters or more')
      }else{
        const newUser = {
          id:new Date().getTime().toString(),
          name: details.name, 
          email:details.email, 
          password:details.password, 
          googleId:details.googleId, 
          loginByGoogle: false,
          favorite: []
        }
        addUser(newUser)
        setDetails({...details,name:'', email:'', password:''})
        alert('Sign Up Success')
      }
    }
  }

  return (
    <div className="login">
      <form className="formLogin" onSubmit={handleSubmit}>
        <div className="form-inner">
          <h2>SignUp</h2>
          <div style={{color:'red'}} className="error">{error}</div>
          <div className="form-group">
              <label htmlFor="name">Name: </label>
              <input type="text" name="name" value={details.name} onChange={e => setDetails({...details, name: e.target.value})}/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" value={details.email} onChange={e => setDetails({...details, email: e.target.value})} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" value={details.password} onChange={e => setDetails({...details, password: e.target.value})} />
          </div>
          <input style={{marginRight:'1rem'}} type="submit" value='SIGNUP'/>
          <br />
          <Link ref={refresh} className='btn-login' type='button' to='/login'>LogIn ?</Link>
        </div>
      </form>
    </div>
  );
};

export default FormSignUp;