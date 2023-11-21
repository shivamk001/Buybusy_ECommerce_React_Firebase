import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Navbar from '../src/Components/Navbar/navbar'
import Home from './Components/Home/Home';
import Signin from './Components/User/Signin';
import Signup from './Components/User/Signup';

function App() {
  const router=createBrowserRouter([
    {path:'/', element: <Navbar/>,
      children:[
        {index: true, element: <Home/>},
        {path:'signup', element: <Signup/>},
        {path:'signin', element: <Signin/>}
      ]
    }
  ])
  return (
   
    <>
      <RouterProvider router={router}/>
    </>
  );
}

export default App;
