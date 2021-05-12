import React, {useState} from 'react';
import {GoogleLogin} from 'react-google-login'


const FormLogin = ({Login,SignUp,error,refresh}) => {
  const [details, setDetails] = useState({name:'', email:'', password:'', googleId:'', loginByGoogle: false})
  const [signUp, setSignUp] = useState(false)

  const handleSubmit = e =>{
    e.preventDefault()
    if (signUp) SignUp(details)
    else 
      Login(details)
  }

  const responseGoogle = (response) =>{
    console.log(response.profileObj)
    const res = response.profileObj
    if(res){
      console.log('responsed', res.name)
      setDetails({...details,name:res.name, email:res.email ,googleId:res.googleId,loginByGoogle: true})
      Login(details)
      console.log(details)
    }
  }

  return (
    <form className="formLogin" onSubmit={handleSubmit}>
      <div className="form-inner">
        <h2>{signUp ? 'SignUp':'Login'}</h2>
        {(error !== "") ? (<div style={{color:'red'}} className="error">{error}</div>): ""}
        {
          signUp ? (<div className="form-group">
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" value={details.name} onChange={e => setDetails({...details, name: e.target.value})}/>
          </div>) : null
        }
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input type="email" name="email" value={details.email} onChange={e => setDetails({...details, email: e.target.value})} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" value={details.password} onChange={e => setDetails({...details, password: e.target.value})} />
        </div>
        <input style={{marginRight:'1rem'}} type="submit" value={`${signUp ? 'SIGNUP' : 'LOGIN'}`} />
        <GoogleLogin
        clientId="153488767284-93tco8vs9jdbi9hjlm0gsnlsgaen2i9h.apps.googleusercontent.com"
        buttonText={`${signUp ? 'Sign up':'Sign in'} with Google`}
        onSuccess={responseGoogle}s
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        />
        <br/>
        <br/>
        <button ref={refresh} className='btn-login' type='button' onClick={()=>setSignUp(!signUp)}>{signUp ? 'LogIn ?': 'SignUp?'}</button>
      </div>
    </form>
  );
};


export default FormLogin;