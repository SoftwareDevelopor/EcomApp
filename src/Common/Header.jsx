import React, { useContext } from 'react'
import logo from '/myntralogo.png'
import { Link } from 'react-router';

import { cartcontaxt } from '../Maincontext';


export default function Header() {
     let obj=useContext(cartcontaxt)
     let {cart}=obj
    return (
        <header className='w-full shadow-md py-6 bg-white'>
            <nav className='max-w-[1320px] mx-auto grid lg:grid-cols-[50%_auto] gap-[500px] items-center'>
                <div className='font-semibold flex justigy-between items-center gap-[100px]'>
                    <a href="/">
                        <img src={logo} className='w-[50px]'  alt="Logo" />
                    </a>
                    
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
