import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where } from "firebase/firestore"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { db } from "./firebaseinit";
import { productContext } from './context';
import Navbar from './Components/Navbar/navbar'
import Home from './Components/Home/Home';
import ProductCart from './Components/ProductCart/ProductCart';
import Signin from './Components/User/Signin';
import Signup from './Components/User/Signup';
import CreateProduct from './Components/CreateProduct/CreateProduct';
import Orders from './Components/Orders/Orders';

function App() {
  let [allProducts, setAllProducts]=useState([])

  let [showSpinner, setShowSpinner]=useState(true)
  
  let [queryObject, setqueryObject]=useState({field:'price', operator:'>=', value:0})

  let [categoryArr, setcategoryArr]=useState([])

  let [searchText, setsearchText]=useState('')

  const router=createBrowserRouter([
    {path:'/', element: <Navbar/>,
      children:[
        {index: true, element: <Home/>},
        {path: 'products', element: <Home/>},
        {path: 'userCarts/:userId/myCart', element: <ProductCart/>},
        {path: 'userOrders/:userId/orders', element: <Orders/>},
        {path:'signup', element: <Signup/>},
        {path:'signin', element: <Signin/>},
        {path: 'createProduct', element: <CreateProduct/>}
      ]
    }
  ])

  useEffect(()=>{
    let {field, operator, value}=queryObject
    let toastMessage=''
    //console.log('App:', queryObject, categoryArr);

    let q=null;
    if(categoryArr.length===0){
      q=query(collection(db, "products"), where(field, operator, value));
      //toastMessage+=`Showing all products with price <= ${value}`
    }
    else{
      q=query(collection(db, "products"), where(field, operator, value), where('category', 'in', categoryArr));

      toastMessage+='Showing products from '
      categoryArr.forEach(category=>{
        toastMessage+=category+', '
      })
      toastMessage+=` and price <= ${value}`
    }

    let regEx= new RegExp(searchText, 'i')

    onSnapshot(q, (snapShot) => {
      const products=snapShot.docs.map((doc)=> {return {id: doc.id, ...doc.data()}}).filter(doc=> regEx.test(doc.name))
      setAllProducts(products)
      setShowSpinner(false)
      if(value>0){
        if(toastMessage.length>0){
          toast(toastMessage)
        }
        
      }
      
    });
    
  },[queryObject, categoryArr, searchText])



  return (
   
    <>
      <ToastContainer />
      <productContext.Provider value={{allProducts, setqueryObject, categoryArr, setcategoryArr, showSpinner, setsearchText }}>
        <RouterProvider router={router}/>
      </productContext.Provider>
      
    </>
  );
}

export default App;
