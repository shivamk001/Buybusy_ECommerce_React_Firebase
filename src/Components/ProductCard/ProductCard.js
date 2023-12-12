//import { useContext } from "react";
import { collection, query, where, updateDoc, addDoc, getDocs } from "firebase/firestore";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { db, auth } from "../../firebaseinit.js";
import styles from './productcard.module.css';
import { toast } from 'react-toastify';

//import { productContext } from '../../context.js';

export default function Card({product}){
    //const {setCartProducts}=useContext(productContext);
    let [userState, setUser]=useState(null);

    async function addToCart(){

        if(userState!==null){
            //console.log(product.id)
            //console.log(userState.uid)
            //get the product from the cart
            let queri=query(collection(db, 'cart'), where('productId','==', product.id), where('userId', '==', userState.uid))

            const querySnapshot=await getDocs(queri);
            //console.log(querySnapshot)
            //console.log(querySnapshot.docs[0].data())
            //console.log(querySnapshot.empty)
            

            //if product in cart, update the quantity
            if(!querySnapshot.empty){
                let docData=querySnapshot.docs[0].data()
                let docRef=querySnapshot.docs[0].ref
                //console.log(docRef)
                await updateDoc(docRef, {
                    quantity: docData.quantity+1
                })
        }
        //else create the product in cart with quantity 1
        else{
            //console.log('vbhkvbhkfb')
            await addDoc(collection(db, 'cart'), {
                productId: product.id,
                userId: userState.uid,
                productName: product.name,
                productPrice: product.price,
                productImage: product.imageLink,
                quantity: 1
            })
        }
        
            toast('Product added to cart!')
        }
        else{
            toast('Please signin to add to cart.')
        }

    }

    useEffect(
        ()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            else{
                // toast('Signin to add to card')
                // navigate('/signin');   
            }
        });
    }, 
    [])
    return (
        <>
            <div className={styles.card}>
                <img className={styles.productImage} src={product.imageLink} alt={`${product.name}`}/>
                <div className={styles.productDetails}>
                    <p className={styles.productName}>{product.name}</p>
                    <h4 className={styles.productPrice}>Rs. {product.price}</h4>
                    <button className={styles.productButton} onClick={()=>{addToCart()}}>Add to Cart</button>
                </div>
            </div>
        </>
    )
}