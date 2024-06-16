import React from 'react'
import "../css/Login.css"
import { auth, provider } from "../config/firebase" 
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'


export const Login = () => {


  const navigate = useNavigate();
  
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);

    navigate('/')
  };

  return (
    <div className='login'>
      <div className="container">
        <h1>LOGIN</h1>
        <p>Faça login com Google</p>
        <button onClick={signInWithGoogle}>Sign In With Google</button>
      </div>
    </div>
  )
}
