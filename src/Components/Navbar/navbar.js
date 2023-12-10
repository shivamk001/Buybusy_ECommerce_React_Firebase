import { useState, useEffect } from "react"
import { Link, Outlet } from 'react-router-dom'
import { signOut } from "firebase/auth";

import styles from './nav.module.css'
import { auth } from "../../firebaseinit";
import { toast } from "react-toastify";
import { onAuthStateChanged } from "firebase/auth";


export default function Header(){
    let [userState, setUser]=useState(null);
    

    function signOutUser(e){
        e.preventDefault()
        console.log('Signing out user.')
        signOut(auth)
        .then(()=>{
            toast('User Signed Out')
            setUser(null)
        })
        .catch((error)=>{

        })
    }

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
          if (user) {
              // User is signed in, see docs for a list of available properties
              // https://firebase.google.com/docs/reference/js/auth.user
              // const uid = user.uid;
              console.log('User in App:', user)
              setUser(user)
              // ...
          }
      });
    }, [])

    
    return (
        <>
            <nav className={styles.navbar}>
            <h1 className={styles.marginLeft}>BuyBusy App</h1>
            <div className={styles.linkcontainer}>
                <div><Link to='/'><i className="fa-solid fa-house fa-xl" style={{color: '#000000'}}></i></Link></div> 
                <div><Link to='/cart'><i className="fa-solid fa-cart-shopping fa-xl" style={{color: "#000000"}}></i></Link></div> 
                <div><Link to='/signup'><i className="fa-solid fa-user-plus fa-xl" style={{color: '#000000'}}></i></Link></div>
                {userState?
                    <div onClick={signOutUser}><i className="fa fa-sign-out fa-xl" style={{color: '#000000'}} title="Sign Out"></i></div>
                    :<div ><Link to='/signin'><i className="fa-solid fa-right-to-bracket fa-xl" style={{color: '#000000'}} title="Sign In"></i></Link></div>
                }
                
            </div>

            </nav>
            <Outlet/>
        </>
        
    )
}