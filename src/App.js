import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from "firebase/firestore"; 

import { db } from "./firebaseinit";
import { productContext } from './context';
import Navbar from './Components/Navbar/navbar'
import Home from './Components/Home/Home';
import Cart from './Components/ProductCart/ProductCart';
import Signin from './Components/User/Signin';
import Signup from './Components/User/Signup';
import CreateProduct from './Components/CreateProduct/CreateProduct';

function App() {
  let [allProducts, setAllProducts]=useState([])
  
  let [queryObject, setqueryObject]=useState({field:'price', operator:'>=', value:0})

  let [categoryArr, setcategoryArr]=useState([])

  const router=createBrowserRouter([
    {path:'/', element: <Navbar/>,
      children:[
        {index: true, element: <Home/>},
        {path: 'cart', element: <Cart/>},
        {path:'signup', element: <Signup/>},
        {path:'signin', element: <Signin/>},
        {path: 'createProduct', element: <CreateProduct/>}
      ]
    }
  ])

  useEffect(()=>{
    let {field, operator, value}=queryObject
    console.log('App:', queryObject, categoryArr);

    let q=null;
    if(categoryArr.length===0){
      q=query(collection(db, "products"), where(field, operator, value));
    }
    else{
      q=query(collection(db, "products"), where(field, operator, value), where('category', 'in', categoryArr));
    }

    onSnapshot(q, (snapShot) => {
      const products=snapShot.docs.map((doc)=> {return {id: doc.id, ...doc.data()}})
      setAllProducts(products)
    });
    
  },[queryObject, categoryArr])


  return (
   
    <>
      <productContext.Provider value={{allProducts, setqueryObject, categoryArr, setcategoryArr}}>
        <RouterProvider router={router}/>
      </productContext.Provider>
      
    </>
  );
}

export default App;
