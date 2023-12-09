import { useState, useRef } from "react"
import { db } from "../../firebaseinit";
import { collection, addDoc } from "firebase/firestore"; 

export default function CreateProduct(){
    let [product, setProduct]=useState({name:'', imageLink:'', price: 0})
    let ref=useRef([])
    async function createProduct(e){
        e.preventDefault()
        await addDoc(collection(db, "products"), product)
        setProduct({name:'', imageLink:'', price: 0})
        console.log(ref.current)
        ref.current.forEach(element=>{
            element.target.value=''
        })
    }

    return (
        <>
            <h2>Create Products</h2>
            <form onSubmit={createProduct}>
                <input type='text' placeholder="Product name" required onChange={(e)=>{setProduct({...product, name: e.target.value })}} onClick={(el)=>ref.current.push(el)}/>
                <input type='text' placeholder="Product link" required onChange={(e)=>{setProduct({...product, imageLink: e.target.value })}} onClick={(el)=>ref.current.push(el)}/>
                <input type='number' placeholder="Product price" required onChange={(e)=>{setProduct({...product, price: e.target.value })}} onClick={(el)=>ref.current.push(el)}/>
                <select required onChange={(e)=>{setProduct({...product, category: e.target.value })}} onClick={(el)=>ref.current.push(el)}>
                    <option value="footwear">Footwear</option>
                    <option value="accessories">Accessories</option>
                    <option value="menclothes">Men Clothes</option>
                    <option value="womenclothes">Women Clothes</option>
                </select>
                <input type='submit' value='create product'/>
            </form>
        </>

    )
}