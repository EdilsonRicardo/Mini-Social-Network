import React from 'react'
import { Link } from 'react-router-dom'
import "../css/Navbar.css"
import { auth } from '../config/firebase'
import { useAuthState } from "react-firebase-hooks/auth"
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth)


  //Logout Function
  const signOutUser = async () => {
    await signOut(auth)
    navigate('/login')
  }



  return (
    <div className='navbar'>


      {/* <Link to="/" className='nav-link' > HOME</Link> */}

      {!user ? (<Link to="/login" className='nav-link' > LOGIN </Link>) :
        (<>
          <Link to="/" className='nav-link' > HOME</Link>
          <Link to="/createpost" className='nav-link' > POST </Link>
        </>)
      }


      <div className='flex-row'>
        {/* Usando o "auth" do componente firebase, para mostrar as informações do usuário */}
        {/* <p>{auth.currentUser?.displayName}</p>
        <img src={auth.currentUser?.photoURL || ""} alt="" id='img-user' /> */}

        {/* O codigo abaixo executa o que o codigo acima tambem executa, mas este de froma mais eficiente e usando o "useAuthState" */}

        {user && (<>
          <p style={{fontSize: "12px"}}>{user?.displayName}</p>
          <img src={user?.photoURL} alt="" id='img-user' />
          <button onClick={signOutUser}>Logout</button>
        </>)}


      </div>

    </div>
  )
}
