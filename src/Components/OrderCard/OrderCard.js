import { collection, deleteDoc, query, where, getDocs } from "firebase/firestore";
import { toast } from 'react-toastify';

import { db } from "../../firebaseinit.js";
import styles from './ordercard.module.css'

export default function OrderCard({product}){
    
    //console.log(product)
        
    // async function increaseQuantity(){
    //     const id=product.id;
    //     let docRef=doc(db, 'cart', id);
    //     let docSnap=await getDoc(docRef)
    //     let data=docSnap.data()
    //     if(docSnap.exists()){
    //         let oldQuantity=docSnap.data().quantity
    //         await updateDoc(docRef, {
    //             quantity: oldQuantity+1
    //         })
    //     }
    //     toast(`${data.productName} added to cart`)
    // }
    // async function decreaseQuantity(){
    //     const id=product.id;
    //     let docRef=doc(db, 'cart', id);
    //     let docSnap=await getDoc(docRef)
    //     let data=docSnap.data()
    //     if(docSnap.exists()){
    //         let oldQuantity=docSnap.data().quantity
    //         if(oldQuantity-1===0){
    //             deleteCartProduct()
    //             toast(`All ${data.name} removed from cart`)
    //             return;
    //         }
    //         await updateDoc(docRef, {
    //             quantity: oldQuantity-1
    //         })
    //         toast(`${data.productName} removed from cart by one`)
    //     }
    // }



    async function deleteCartProduct(){
        const productId=product.productId;
        const userId=product.userId;
        let queri=query(collection(db, 'orders'), where('productId','==', productId), where('userId', '==', userId))
        let querySnap=await getDocs(queri)
        
        let docRef=querySnap.docs[0].ref
        if(docRef){
            await deleteDoc(docRef)
            toast('Product deleted.')
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
                <p> {product.quantity}&nbsp;</p>
            </div>     
            <div className={styles.textDiv}><p>₹{product.productPrice}</p></div>  
            <div className={styles.textDiv}><p>₹{parseInt(product.quantity)*parseInt(product.productPrice)}</p></div>
            <div className={styles.textDiv}>
                <button className={styles.deleteCartProductButton} onClick={deleteCartProduct}><i className={`fa-solid fa-trash fa-sm ${styles.deleteIcon}`}></i></button>
            </div>
        </>
    )
}