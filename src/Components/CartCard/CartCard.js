import { collection, deleteDoc, doc, query, where, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { toast } from 'react-toastify';

import { db } from "../../firebaseinit.js";
import styles from './cartcard.module.css'

export default function CartCard({product}){
    
    //console.log(product)
        
    async function increaseQuantity(){
        const id=product.id;
        let docRef=doc(db, 'cart', id);
        let docSnap=await getDoc(docRef)
        let data=docSnap.data()
        if(docSnap.exists()){
            let oldQuantity=docSnap.data().quantity
            await updateDoc(docRef, {
                quantity: oldQuantity+1
            })
        }
        toast(`${data.productName} added to cart`)
    }
    async function decreaseQuantity(){
        const id=product.id;
        let docRef=doc(db, 'cart', id);
        let docSnap=await getDoc(docRef)
        let data=docSnap.data()
        if(docSnap.exists()){
            let oldQuantity=docSnap.data().quantity
            if(oldQuantity-1===0){
                deleteCartProduct()
                toast(`All ${data.name} removed from cart`)
                return;
            }
            await updateDoc(docRef, {
                quantity: oldQuantity-1
            })
            toast(`${data.productName} removed from cart by one`)
        }
    }



    async function deleteCartProduct(){
        const productId=product.productId;
        const userId=product.userId;
        let queri=query(collection(db, 'cart'), where('productId','==', productId), where('userId', '==', userId))
        let querySnap=await getDocs(queri)
        
        let docRef=querySnap.docs[0].ref
        if(docRef){
            await deleteDoc(docRef)
        }


        //let docRef=doc(db, 'cart', id);
        // let docSnap=await getDoc(docRef)
        // if(docSnap.exists()){
        //     await deleteDoc(docRef)
        // }

    }
    return (
        <>
            <div><img src={product.productImage} className={styles.image} alt={product.productName}/></div>
            <div className={styles.textDiv}><p>{product.productName}</p></div>
            <div className={styles.textDiv}>
                <button onClick={()=>decreaseQuantity()} className={styles.decreseQuantityButton}><i className="fa-solid fa-minus fa-xs" style={{color: "#df1111"}}></i></button> &nbsp;
                <p> {product.quantity}&nbsp;
                <button onClick={()=>increaseQuantity()} className={styles.increaseQuantityButton}><i className="fa-solid fa-plus fa-xs" style={{color: "#2eef3b"}}></i></button></p></div>     
            <div className={styles.textDiv}><p>₹{product.productPrice}</p></div>  
            <div className={styles.textDiv}><p>₹{parseInt(product.quantity)*parseInt(product.productPrice)}</p></div>
            <div className={styles.textDiv}>
                <button className={styles.deleteCartProductButton} onClick={deleteCartProduct}><i className={`fa-solid fa-trash fa-sm ${styles.deleteIcon}`}></i></button>
            </div>
        </>
    )
}