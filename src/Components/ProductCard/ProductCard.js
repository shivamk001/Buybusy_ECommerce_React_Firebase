//import { useContext } from "react";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

import { db } from "../../firebaseinit.js";
import styles from './productcard.module.css';
//import { productContext } from '../../context.js';

export default function Card({product}){
    //const {setCartProducts}=useContext(productContext);
    async function addToCart(){

        //get the product from the cart
        const docRef=doc(db, 'cart', product.id)
        const docSnap=await getDoc(docRef);

        //if product in cart, update the quantity
        if(docSnap.exists()){
            let oldQuantity=docSnap.data().quantity
            await updateDoc(docRef, {
                quantity: oldQuantity+1
            })
        }
        //else creaate the product in cart with quantity 1
        else{
            await setDoc(docRef, {
                name: product.name,
                quantity: 1,
                price: product.price,
                imageLink: product.imageLink
            })
        }
    }
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