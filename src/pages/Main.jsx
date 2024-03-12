import React, { useEffect, useState } from 'react'
import { getDocs, collection } from 'firebase/firestore'
import { auth, db } from "../config/firebase"
import { Post } from './Post'
import { useAuthState } from 'react-firebase-hooks/auth'


export const Main = () => {
  const [postsList, setPostsList] = useState(null)
  const postsRef = collection(db, "posts")
  const [user] = useAuthState(auth)

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    //console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id}))); 
    setPostsList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }


  useEffect(() => {
    getPosts();

  }, [])
  return (
    
    <div>
      
      { !user ?  <h1>WELCOME</h1> :
      postsList?.map((post) =>
        (<Post post={post} />)
        ) 
      }
    
    </div>


  )
}
