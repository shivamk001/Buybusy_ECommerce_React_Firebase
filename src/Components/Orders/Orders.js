import { useEffect, useState } from "react"
import { collection, where, query, onSnapshot } from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth";

import { db, auth } from "../../firebaseinit";
import styles from './order.module.css';
import OrderCard from "../OrderCard/OrderCard";
import Spinner from 'react-spinner-material';
import { useNavigate, useParams } from "react-router-dom";

export default function Orders(){
    let [loading, setLoading]=useState(true)
    let [orderProducts, setOrderProducts]=useState([])
    let [orderTotal, setOrderTotal]=useState(0)
    let [orderQuantity, setOrderQuantity]=useState(0)
    const {userId}=useParams()
    const navigate=useNavigate()



    useEffect(
        ()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {


                let queri=query(collection(db, "orders"), where('userId', '==', userId));

                onSnapshot(queri, (snapShot) => {
                    const orderProducts=snapShot.docs.map((doc)=> {return {id: doc.id, ...doc.data()}})
                    //console.log(orderProducts)
                    const orderTotal=orderProducts.reduce((total, product)=>{
                        //console.log(parseInt(product.productPrice)," ", parseInt(product.quantity));
                        return total+parseInt(product.productPrice)*parseInt(product.quantity)
                    },0)
                    //console.log(orderTotal)
                    const orderQuantity=orderProducts.reduce((total, product)=>{
                        return total+product.quantity
                    }, 0)
                    setOrderProducts(orderProducts)
                    setOrderTotal(orderTotal)
                    setOrderQuantity(orderQuantity)
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
        <h2>My Orders</h2>
        <div className={styles.orderContainer}>
            <div className={styles.orderGrid}>
                <div className={styles.textDiv}><h4>Image</h4></div>
                <div className={styles.textDiv}><h4>Name</h4></div>
                <div className={styles.textDiv}><h4>Quantity</h4></div>     
                <div className={styles.textDiv}><h4>Price</h4></div>  
                <div className={styles.textDiv}><h4>Total Price</h4></div>
                <div className={styles.textDiv}><h4>Remove Item</h4></div>
                {orderProducts.map(product=>(
                    <OrderCard product={product} key={product.id}/>
                ))}
                <div className={styles.textDiv}></div>
                <div className={styles.textDiv}></div>
                <div className={styles.textDiv}><h5>Total Quantity: </h5>&nbsp;<p>{orderQuantity}</p></div>
                <div className={styles.textDiv}></div>
                <div className={styles.textDiv}><h5>Total Value: </h5>&nbsp;<p>₹{orderTotal}</p></div>
            </div>
        </div>


        </>
    )
}