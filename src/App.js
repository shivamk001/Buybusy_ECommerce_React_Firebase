import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, onSnapshot } from "firebase/firestore"; 

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
    onSnapshot(collection(db, "products"), (snapShot) => {
        const products=snapShot.docs.map((doc)=> {return {id: doc.id, ...doc.data()}})
        setAllProducts(products)
    });
    
  },[])


  return (
   
    <>
      <productContext.Provider value={{allProducts}}>
        <RouterProvider router={router}/>
      </productContext.Provider>
      
    </>
  );
}

export default App;
