import { useState, useEffect } from "react"
import { db } from "../../firebaseinit";
import { collection, onSnapshot } from "firebase/firestore"; 

export default function Home(){
    let [allProducts, setAllProducts]=useState([])

    // async function createProduct(e){
    //     e.preventDefault()
    //     await addDoc(collection(db, "products"), product)

    //     const querySnapshot = await getDocs(collection(db, "products"));
    //     let productArray=[]
    //     querySnapshot.forEach((doc) => {
    //         productArray.push(doc.data())
    //     });
    //     setAllProducts(productArray)
    // }


    useEffect(()=>{
        // console.log('UseEffect called')
        // async function getAllProducts(){
        //     const querySnapshot = await getDocs(collection(db, "products"));
        //     let productArray=[]
        //     querySnapshot.forEach((doc) => {
        //         productArray.push(doc.data())
        //     });
        //     setAllProducts(productArray)
        // }
        // getAllProducts()

        onSnapshot(collection(db, "products"), (snapShot) => {
            const products=snapShot.docs.map((doc)=> {return {id: doc.id, ...doc.data()}})
            setAllProducts(products)
        });
        
    },[])

    return (
        <>
            <h2>All Products</h2>
            {allProducts.map((product, index)=>(<p key={index}>{product.name}, {product.price}</p>))}
        </>

    )
}