import { useEffect, useState } from "react"
import { collection, doc, where, query, onSnapshot, writeBatch } from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth";

import { db, auth } from "../../firebaseinit";
import styles from './productcart.module.css';
import CartCard from "../CartCard/CartCard";
import Spinner from 'react-spinner-material';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ProductCart(){
    let [loading, setLoading]=useState(true)
    let [cartProducts, setCartProducts]=useState([])
    let [cartTotal, setCartTotal]=useState(0)
    let [cartQuantity, setCartQuantity]=useState(0)
    const {userId}=useParams()
    const navigate=useNavigate()

    async function checkout(){

        if(cartProducts.length<=0){
            toast('Please add a product to cart to checkout.')
            return;
        }
        const batch=writeBatch(db);

        //add each product to order
        cartProducts.forEach(docu=>{
            console.log(docu)
            const docRef=doc(db, 'orders', docu.id)
            batch.set(docRef, {
                productId: docu.productId,
                productPrice: docu.productPrice,
                productName: docu.productName,
                productImage: docu.productImage,
                quantity: docu.quantity,
                userId: docu.userId
            })
        })
        

        //delete each product to card
        cartProducts.forEach(docu=>{
            console.log(docu)
            const docRef=doc(db, 'cart', docu.id)
            batch.delete(docRef)
        })

        await batch.commit()

        //navigate to order
        toast('Checking out. Moving to orders.')
        navigate(`/userOrders/${userId}/orders`)

    }


    useEffect(
        ()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {


                let queri=query(collection(db, "cart"), where('userId', '==', userId));

                onSnapshot(queri, (snapShot) => {
                    const cartProducts=snapShot.docs.map((doc)=> {return {id: doc.id, ...doc.data()}})
                    //console.log(cartProducts)
                    const cartTotal=cartProducts.reduce((total, product)=>{
                        //console.log(parseInt(product.productPrice)," ", parseInt(product.quantity));
                        return total+parseInt(product.productPrice)*parseInt(product.quantity)
                    },0)
                    //console.log(cartTotal)
                    const cartQuantity=cartProducts.reduce((total, product)=>{
                        return total+product.quantity
                    }, 0)
                    setCartProducts(cartProducts)
                    setCartTotal(cartTotal)
                    setCartQuantity(cartQuantity)
                    setTimeout(()=>{setLoading(false)}, 1000)
                            
                });
            }
            else{
                //toast('Signin to access cart')
                navigate('/signin');   
            }
        });
    }, 
    [])

    return (
        <>
        {loading && 
            <div className={styles.spinnerDiv}>
                <Spinner radius={120} color={"#333"} stroke={2} visible={loading} />
            </div>}
        <h2>My Cart</h2>
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
                <div className={styles.textDiv}><button onClick={checkout} className={styles.checkoutButton}>Proceed to checkout</button></div>
            </div>
        </div>


        </>
    )
}