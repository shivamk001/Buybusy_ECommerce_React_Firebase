import { useState } from "react"
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firebaseinit";

export default function Signup(){
    let [email, setEmail]=useState('');
    let [password, setPassword]=useState('');
    let [confirmPassword, setConfirmPassword]=useState('');

    function handleSubmit(e){
        e.preventDefault();
        console.log(email, password, confirmPassword)

        if(password!==confirmPassword){
            toast('Password and Confirm Password dont match.')
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user)
        // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('Error:', errorMessage);
            // ..
        });
    }

    return (
        <>
            <h6>Signup</h6>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} required/>
                <input type="password" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} required/>
                <input type="password" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)} required/>
                <input type="submit"/>
            </form>
        </>

    )
}