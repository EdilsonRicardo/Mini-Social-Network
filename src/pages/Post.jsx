import { addDoc, getDocs, collection, query, where, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';
import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';

export const Post = (props) => {

  const { post } = props;
  const [user] = useAuthState(auth)

  const [likes, setLikes] = useState(null)

  const likesRef = collection(db, "likes")

  const likesDoc = query(likesRef, where("postId", "==", post.id)) //usando query do firestore

  const getLikes = async () => {
    const data = await getDocs(likesDoc)
    //console.log(data.docs.map((doc) => ({...doc.data(), id: doc.id}))); 
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId }))) //o like torna-se uma lista de objectos que contem o id dos usuarios que colocaram like
  }
  const addLike = async () => {
    try {
      //addDoc recebe uma referencia da coleccao na qual queremos adicionar um doc e a seguir os dados a serem adicionados
      await addDoc(likesRef, {
        userId: user?.uid, postId: post.id   //o userId e' do usuario logado
      })
      if (user) {
        setLikes((prev) => prev ? [...prev, { userId: user.uid }] : [{ userId: user.uid }]) //Se prev nao for null, copia o array de id's que ja havia antes e adiciona o novo userId, caso contrario cria um novo com o actual
      }
    } catch (err) {
      console.log(err);
    }
  }

  const removeLike = async () => {
    try {
      const specificLikeToDelete = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid))

      const likeToDeleteData = await getDocs(specificLikeToDelete)
      //acessando o primeiro documento retornado pela consulta usando likeToDeleteData.docs[0]
      //Por exemplo, considerando que temos uma coleção chamada "users" e queremos acessar o documento com o ID "user1", podemos fazer assim:
      //const userRef = doc(db, 'users', 'user1');
      const likeId =  likeToDeleteData.docs[0].id
      const likeToDelete = doc(db, "likes", likeId)

      await deleteDoc(likeToDelete)

      if (user) {
        setLikes((prev) =>
          prev?.filter((like) => like.id === likeId)
        )
      }
    } catch (err) {
      console.log(err);
    }
  }

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid) // a comparar o id do user dentro do array e do user logado

  useEffect(() => {
    getLikes()
  }, [])

  return (
    <div>
      <div className="title">
        <h1>{post.title}</h1>
      </div>
      <div className="body">
        <p>{post.description}</p>
      </div>

      <div className="footer">
        <p>@{post.username}</p>
        <button onClick={hasUserLiked ? removeLike : addLike}>{hasUserLiked ? <>&#128078;</> : <>&#128077;</>} </button>
        {likes && <p>Likes: {likes?.length}</p>}
      </div>
    </div>
  )
}
