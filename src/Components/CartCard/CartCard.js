import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { toast } from 'react-toastify';

import { db } from "../../firebaseinit.js";
import styles from './cartcard.module.css'

export default function CartCard({product}){
    

        
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
        toast(`${data.name} added to cart`)
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
            toast(`${data.name} removed from cart by one`)
        }
    }



    async function deleteCartProduct(){
        const id=product.id;
        let docRef=doc(db, 'cart', id);
        let docSnap=await getDoc(docRef)
        if(docSnap.exists()){
            await deleteDoc(docRef)
        }

    }
    return (
        <>
            <div><img src={product.imageLink} className={styles.image} alt={product.name}/></div>
            <div className={styles.textDiv}><p>{product.name}</p></div>
            <div className={styles.textDiv}>
                <button onClick={()=>decreaseQuantity()} className={styles.decreseQuantityButton}><i className="fa-solid fa-minus fa-xs" style={{color: "#df1111"}}></i></button> &nbsp;
                <p> {product.quantity}&nbsp;
                <button onClick={()=>increaseQuantity()} className={styles.increaseQuantityButton}><i className="fa-solid fa-plus fa-xs" style={{color: "#2eef3b"}}></i></button></p></div>     
            <div className={styles.textDiv}><p>₹{product.price}</p></div>  
            <div className={styles.textDiv}><p>₹{parseInt(product.quantity)*parseInt(product.price)}</p></div>
            <div className={styles.textDiv}>
                <button className={styles.deleteCartProductButton} onClick={deleteCartProduct}><i className="fa-solid fa-trash fa-sm" style={{color: "#df1111"}}></i></button>
            </div>
        </>
    )
}