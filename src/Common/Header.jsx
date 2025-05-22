import React, { useContext } from 'react'
import logo from '/src/assets/myntralogo.png'
import { Link } from 'react-router';

import { cartcontaxt } from '../Maincontext';


export default function Header() {
     let obj=useContext(cartcontaxt)
     let {cart}=obj
    return (
        <header className='w-full shadow-md p-9 bg-white'>
            <nav className='max-w-[1320px] mx-auto grid lg:grid-cols-[40%_auto] gap-[500px] items-center'>
                <div className='font-semibold flex justigy-between items-center gap-[100px]'>
                    <Link to="/">
                        <img src={logo} className="h-15" alt="Logo" />
                    </Link>
                    
                    <ul className='flex gap-7 justify-between items-center'>
                        <li>
                            <Link to={'/'}>Men</Link>
                        </li>
                        <li>Women</li>
                        <li>Kids</li>
                        <li>HomeLiving</li>
                        <li>Beauty</li>
                        <li className='flex'>Studio <sup>New</sup> </li>
                    </ul>

                </div>
                <div>
                    <Link to="/cart">
                        <h1>Cart ({cart.length})</h1>
                    </Link>


                </div>
            </nav>
        </header>
    )
}
