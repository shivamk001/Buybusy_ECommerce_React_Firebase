import { useEffect, useState } from "react"
import { collection, onSnapshot } from "firebase/firestore"; 

import { db } from "../../firebaseinit";
import styles from './productcart.module.css';
import CartCard from "../CartCard/CartCard";

export default function Cart(){
    let [cartProducts, setCartProducts]=useState([])
    let [cartTotal, setCartTotal]=useState(0)
    let [cartQuantity, setCartQuantity]=useState(0)
    console.log(cartProducts)

    useEffect(()=>{
        onSnapshot(collection(db, "cart"), (snapShot) => {
            const cartProducts=snapShot.docs.map((doc)=> {return {id: doc.id, ...doc.data()}})
            const cartTotal=cartProducts.reduce((total, product)=>{
                return total+parseInt(product.price)*parseInt(product.quantity)
            },0)
            const cartQuantity=cartProducts.reduce((total, product)=>{
                return total+product.quantity
            }, 0)
            setCartProducts(cartProducts)
            setCartTotal(cartTotal)
            setCartQuantity(cartQuantity)
            setTimeout(()=>{setLoading(false)}, 500)
            
        });
        
    },[])

    return (
        <>
        <h4>My Cart</h4>
        <div className={styles.cartContainer}>
            <div className={styles.cartGrid}>
                <div className={styles.textDiv}><h4>Image</h4></div>
                <div className={styles.textDiv}><h4>Name</h4></div>
                <div className={styles.textDiv}><h4>Quantity</h4></div>     
                <div className={styles.textDiv}><h4>Price</h4></div>  
                <div className={styles.textDiv}><h4>Total Price</h4></div>
                <div className={styles.textDiv}><h4>Remove Item</h4></div>
                {cartProducts.map(product=>(
                    <CartCard product={product} key={product.id}/>
                ))}
                <div className={styles.textDiv}></div>
                <div className={styles.textDiv}></div>
                <div className={styles.textDiv}><h5>Total Quantity: </h5>&nbsp;<p>{cartQuantity}</p></div>
                <div className={styles.textDiv}></div>
                <div className={styles.textDiv}><h5>Total Value: </h5>&nbsp;<p>₹{cartTotal}</p></div>
                <div className={styles.textDiv}></div>
            </div>
        </div>


        </>
    )
}