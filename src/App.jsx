import React from "react";
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPastes from "./components/ViewPastes";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element : <div>
         <Navbar/>
         <Home/>
      </div>
    },
    {
      path: "/pastes",
      element : <div>
           <Navbar/>
           <Paste/>
      </div>
    },
    {
       path : "/pastes/:id",
       element : <div>
          <Navbar/>
          <ViewPastes/>
       </div>
    }
  ])
   
  return (
     <>
       <RouterProvider router={router}/>
     </>
  )
}

export default App;
