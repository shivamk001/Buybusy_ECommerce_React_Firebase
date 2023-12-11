import { useState, useRef } from "react"
import { db } from "../../firebaseinit";
import { collection, addDoc } from "firebase/firestore"; 
import Form from '../Form/Form'

export default function CreateProduct(){
    let [product, setProduct]=useState({name:'', imageLink:'', price: 0})
    let ref=useRef([])
    async function createProduct(e){
        e.preventDefault()
        await addDoc(collection(db, "products"), product)
        setProduct({name:'', imageLink:'', price: 0})
        //console.log(ref.current)
        ref.current.forEach(element=>{
            element.target.value=''
        })
    }

    return (
        <>
            <Form handleSubmit={createProduct}>
                <h2>Create Products</h2>
                <div>
                    <label for='productName'>Product Name</label>
                    <input id='productName' type='text' placeholder="Product name" required onChange={(e)=>{setProduct({...product, name: e.target.value })}} onClick={(el)=>ref.current.push(el)}/>
                </div>       
                <div>
                    <label for='productLink'>Product Link</label>
                    <input id='productLink' type='text' placeholder="Product link" required onChange={(e)=>{setProduct({...product, imageLink: e.target.value })}} onClick={(el)=>ref.current.push(el)}/>
                </div>
                <div>
                    <label form="productPrice">Product Price</label>
                    <input id='productPrice' type='number' placeholder="Product price" required onChange={(e)=>{setProduct({...product, price: e.target.value })}} onClick={(el)=>ref.current.push(el)}/>
                </div>
                <div>
                    <label for='productCategory'>Product Category</label>
                    <select id='productCategory' required onChange={(e)=>{setProduct({...product, category: e.target.value })}} onClick={(el)=>ref.current.push(el)}>
                        <option value="footwear">Footwear</option>
                        <option value="accessories">Accessories</option>
                        <option value="menclothes">Men Clothes</option>
                        <option value="womenclothes">Women Clothes</option>
                    </select>
                </div>

                <button type='submit'>Create Product</button>
            </Form>
        </>

    )
}