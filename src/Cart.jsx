import React, { useContext, useEffect, useState } from 'react'
import Header from './Common/Header'
import { cartcontaxt } from './Maincontext'
import Footer from './Common/Footer'
import { useRazorpay, RazorpayOrderOptions } from 'react-razorpay'


export default function Cart() {
    let { cart } = useContext(cartcontaxt)
    let [totalprice, settotalprice] = useState(null)
    let [Name, setName] = useState('')
    let [Address, setAddress] = useState('')
    let [PinCode, setPincode] = useState(null)
    let [PhoneNumber, setPhoneNumber] = useState(null)

    const { error, isLoading, Razorpay } = useRazorpay()

    useEffect(() => {
        let totalPrice = cart.reduce((total, item) => total + (item.price * item.qty), 0);
        settotalprice(totalPrice)
    }, [cart])

    let handlepayment = (name, phonenumber, pincode, email) => {
        const options = {
            key: "rzp_test_Rt9r2TBJka1M7C",
            amount: totalprice * 100,
            currency: "INR",
            name: "Test Company",
            description: "Test Transaction",
            handler: (response) => {
                console.log(response);
                alert("Payment Successful!");
            },
            prefill: {
                name: name,
                email: email,
                contact: { phonenumber }
            },
            theme: {
                color: "#F37254",
            },
        }
        const razorpayincetance = new Razorpay(options)
        razorpayincetance.open();
        setcount(0)
    }

    let checkout = (e) => {
        e.preventDefault()
        let obj = {
            name: e.target.name.value,
            email: e.target.email.value,
            pincode: e.target.pincode.value,
            phonenumber: e.target.phone_number.value
        }
        handlepayment(obj.name, obj.phonenumber, obj.pincode, obj.email)
    }

    console.log(cart)

    

    let [count, setcount] = useState(0)

    return (
        <><Header /><div className='max-w-[1320px] mx-auto p-5'>
            <div className="bg-gray-600">
                <h1 className="text-white text-3xl font-bold text-center py-5">My Cart</h1>

            </div>
            <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-2/3 bg-white p-5 shadow-md">
                    <h2 className="text-xl font-bold mb-4">Items in your cart</h2>
                    {/* Cart items will be displayed here */}
                    <div className=" bg-gray-300 py-4 px-5 grid grid-cols-4 justify-between items-center">
                        <h1>Product Name</h1>
                        <h1>Quantity</h1>
                        <h1>Price</h1>
                        <h1>Total Price</h1>
                    </div>
                    {
                        cart.length >= 1 ?
                            cart.map((items, index) => {
                                return (
                                    <CartItem data={items} key={index} />
                                )
                            })
                            :
                            "No data found in item"
                    }

                </div>
                <div className="w-full md:w-1/3 bg-white p-5 shadow-md">
                    <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                    {/* Order summary will be displayed here */}
                    {
                        cart.length >= 1 ?
                            (
                                <div className="grid grid-cols-2 gap-4 justify-between items-center">
                                    <h1>Total Amounts: Rs. {totalprice} </h1>
                                    <button class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={() => setcount(count == 0 ? 1 : 0)}>
                                        Checkout
                                    </button>
                                    <div
                                        id="crud-modal"
                                        tabIndex="-1"
                                        aria-hidden="true"
                                        className={` fixed top-[50%] border  left-[50%] translate-x-[-50%] translate-y-[-50%] ${count === 1 ? 'block' : 'hidden'}`}
                                    >
                                        <div class="relative w-full max-w-md max-h-full">
                                            <div class="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                                        Place Your Order
                                                    </h3>
                                                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => setcount(count == 0 ? 'hidden' : 'block')}>
                                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                        </svg>
                                                        <span class="sr-only">Close modal</span>
                                                    </button>
                                                </div>
                                                <form class="p-4 md:p-5" onSubmit={checkout}>
                                                    <div class="grid gap-4 mb-4 grid-cols-2">
                                                        <div class="col-span-2">
                                                            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                                            <input type="text" name="name" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your name" required="" onChange={(Event) => setName(Event.target.value)} />
                                                        </div>
                                                        <div class="col-span-2 sm:col-span-1">
                                                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                                            <input type="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Enter your Email" required="" onChange={(Event) => setAddress(Event.target.value)} />
                                                        </div>
                                                        <div class="col-span-2 sm:col-span-1">
                                                            <label for="pincode" >Pincode</label>
                                                            <input type="number" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' placeholder='Enter pincode' name="pincode" id="" onChange={(Event) => setPincode(Event.target.value)} />
                                                        </div>
                                                        <div class="col-span-2">
                                                            <label for="phonenumber" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                                            <input type="tel" className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500' placeholder='Enter your phone number' name="phone_number" id="" onChange={(Event) => setPhoneNumber(Event.target.value)} />
                                                        </div>
                                                    </div>
                                                    <button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">

                                                        Order Now
                                                    </button>
                                                    {isLoading && <p>Loading Razorpay...</p>}
                                                    {error && <p>Error loading Razorpay: {error}</p>}
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                            :
                            (
                                <div className="grid grid-cols-2 gap-4 justify-between items-center">
                                    <h1>Total Amounts: Rs. 0</h1>

                                </div>
                            )
                    }

                </div>
            </div>

        </div >
            <Footer />
        </>
    )
}

export function CartItem({ data }) {
    let { cart } = useContext(cartcontaxt)

    let { id, name, price, image, qty } = data
    let [cartitemqty, setcartitemqty] = useState(qty)
    useEffect(() => {
        cart.forEach((item) => {
            if (item.id == id) {
                item['qty'] = cartitemqty
            }
        })
    }, [cartitemqty, cart, id])
    console.log(cart)
    return (
        <div className=" bg-gray-300 py-4 px-5 grid grid-cols-4 justify-between items-center">
            <div className='flex flex-col justify-center'>
                <figure className='h-20'>
                    <img src={image} alt="" srcset={image} className='h-full' />
                </figure>
                <figcaption>{name}</figcaption>
            </div>
            <h1 className='flex gap-3 items-center '>

                <span className='border w-4 h-4 p-3 flex justify-center cursor-pointer items-center border-gray-500' onClick={() => setcartitemqty(cartitemqty > 1 ? cartitemqty - 1 : 1)}>-</span>
                <span className='w-8 py-1 text-center border'>{qty}</span>
                <span className='border w-4 h-4 p-3 flex justify-center cursor-pointer items-center border-gray-500' onClick={() => setcartitemqty(cartitemqty + 1)}>+</span>
            </h1>
            <h1>{price}</h1>
            <h1>{qty * price}</h1>
        </div>
    )
}