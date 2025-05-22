import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
export let cartcontaxt=createContext();
export default function Maincontext({children}) {
    let [cart,setcart]=useState( localStorage.getItem("CART") ? JSON.parse(localStorage.getItem("CART")) : [])  
    
    let obj={
        cart,
        setcart
    }
    useEffect( ()=>{
        localStorage.setItem("CART", JSON.stringify(cart))  // means that we use the localstorage to set item for taking the previous data even whenever refresh the page.
    },[cart])
  return (
    <cartcontaxt.Provider value={obj}>      
        {children}
    </cartcontaxt.Provider>     
  )
}
