import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

import { auth } from "../../firebaseinit";


import Form from "../Form/Form";

export default function Signin(){
    let [email, setEmail]=useState('');
    let [password, setPassword]=useState('');
    const navigate=useNavigate();

    function handleSubmit(e){
        e.preventDefault()
        //console.log(email, password)

        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          //console.log('Signin user:', user)
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
            
            <Form handleSubmit={handleSubmit}>
                <h2>Signin</h2>
                <div>
                  <label for='signinEmail'>Email</label>
                  <input id='signinEmail' type="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} required/>
                </div>
                <div>
                  <label for='signinPassword'>Password</label>
                  <input id='signinPassword' type="password" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} required/>
                </div>
                <button type='submit'>Submit</button>
            </Form>
        </>

    )
}