import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
// import { toast } from "react-toastify";

import { auth } from "../../firebaseinit";
import { useNavigate } from "react-router-dom";

export default function Signin(){
    let [email, setEmail]=useState('');
    let [password, setPassword]=useState('');
    const navigate=useNavigate();

    function handleSubmit(e){
        e.preventDefault()
        console.log(email, password)

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log('Signin user:', user)
          //useNavigate('/')
          // ...

          if(user){
            navigate('/')
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log('Error:', errorCode, errorMessage);
        });
    }

    return (
        <>
            <h6>Signin</h6>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} required/>
                <input type="password" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} required/>
                <input type="submit"/>
            </form>
        </>

    )
}