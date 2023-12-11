import { useState } from "react"
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../firebaseinit";

import Form from "../Form/Form";

export default function Signup(){
    let [email, setEmail]=useState('');
    let [password, setPassword]=useState('');
    let [confirmPassword, setConfirmPassword]=useState('');

    function handleSubmit(e){
        e.preventDefault();
        //console.log(email, password, confirmPassword)

        if(password!==confirmPassword){
            toast('Password and Confirm Password dont match.')
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        //console.log(user)
        // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            //console.log('Error:', errorMessage);
            // ..
        });
    }

    return (
        <>
            
            <Form handleSubmit={handleSubmit}>
                <h2>Signup</h2>
                <div>
                    <label for='signupEmail'>Email</label>
                    <input id='signupEmail' type="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label for='signupPassword'>Password</label>
                    <input id='signupPassword' type="password" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} required/>
                </div>
                <div>
                    <label for='signupConfirm'>Confirm Password</label>
                    <input id='signupConfirm' type="password" placeholder="Confirm Password" onChange={(e)=>setConfirmPassword(e.target.value)} required/>
                </div>
                
                <button type='submit'>Submit</button>
            </Form>
        </>

    )
}