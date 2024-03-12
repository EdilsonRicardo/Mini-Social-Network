import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { addDoc, collection} from "firebase/firestore"
import {auth, db} from "../../config/firebase"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'
import "../../css/CreateForm.css"


export const CreateForm = () => {

    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    //const cleanInputs = useState("");

    const schema = yup.object().shape({
        title: yup.string().required("Write a Title"),
        description: yup.string().required("Write a Description"),

    })

    //usamos o register para validar os campos
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const postsRef = collection(db, "posts");

    const createPost = async(data) => {

    //addDoc recebe uma referencia da coleccao na qual queremos adicionar um doc e a seguir os dados a serem adicionados
        await addDoc(postsRef, { 
            title: data.title,
            description: data.description,
            username: user?.displayName, 
            userId: user?.uid
        })
        navigate('/')
    }

    return (
        <form onSubmit={handleSubmit(createPost)}>
            <input type="text" name="" id="input-title" placeholder='Title...' {...register("title")} />
            <p style={{ color: "red", fontSize: '15px' }}>{errors.title?.message}</p>
            <textarea type="text" name="" id="textarea-description" placeholder='Description...' {...register("description")} />
            <p style={{ color: "red", fontSize: '15px' }}>{errors.description?.message}</p>
            <input type="submit" id='submit-button' value="Publish" />
        </form>
    )
}
