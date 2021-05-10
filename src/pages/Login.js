import React, { useState, useEffect } from 'react';
import FormLogin from '../components/FormLogin'
import '../components/FormLogin.css'
import {useGlobalContext} from '../context'
import {Redirect} from 'react-router-dom'
import firebase from "../firebase";



const Login = () => {
  const {user,setUser,checkLogin,setCheckLogin, userInfo} = useGlobalContext()
  const [error,setError] = useState("")

  const ref = firebase.firestore().collection("users")

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
        alert('Sign Up Success')
      }
    }
  }

  const Login = (details) =>{
    if(details.loginByGoogle){
      console.log('login by google')
      setUser({
        id: details.id,
        name: details.name,
        email: details.email
      })
    }
    else{
      if( details.email === ""|| details.password === ""){
        setError('Please fill it out completely')
      }
      else{
        userInfo.forEach((item) => {
          if(details.email === item.email && details.password === item.password){
            setUser({
              id: item.id,
              name: item.name,
              email: item.email
            })
            const login = {
              id: item.id,
              name: item.name,
              email: item.email
            }
            localStorage.setItem('login',JSON.stringify(login))
          }else{
            setError('Details do not match!')
          }
        })
      }
    }
  }


  useEffect(() => {
    const CheckLogin  = () =>{
      if(user.email !== "") setCheckLogin(true)
      else
        setCheckLogin(false)
    }
    CheckLogin()
  }, [user]);


  return(
    <div  className="login">
      {checkLogin ? <Redirect to='/'/> : <FormLogin Login={Login} SignUp={SignUp} error={error}/>}
    </div>
  );
};

export default Login


