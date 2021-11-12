import React from "react";
import { useState} from "react";
import { database } from "../util/firebase.js";
import {ref, set, update, push } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export const Form = () => {
    const [title, setTitle] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [modal, setModal] =  useState("");


    const handleOnChange = (e) => {
        setTitle(e.target.value);
    }

    const handleUserName = (e) => {
        setUsername(e.target.value);
    }
    const checkUser =() => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, username, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            setModal("You are signed in")
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setModal("errorMessage")

          });

        
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const createTodo = () => {
        push(ref(database, 'Todo/'), {
            title,
            complete:false,
          });
        }

    return (
        <>
        <div>
            <input onChange={handleOnChange} type="text"/>
            <button onClick={createTodo}>ADD</button>
        </div>
            <input onChange={handleUserName} type="text"/>
            <input onChange={handlePassword} type="text"/>
            <button onClick={checkUser}>Sign in</button>
            <p>{modal}</p>
        </>
    )
}