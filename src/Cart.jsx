import React, { useContext, useEffect, useState } from 'react'
import Header from './Common/Header'
import { cartcontaxt } from './Maincontext'

export default function Cart() {
    let { cart, setcart } = useContext(cartcontaxt)
    let [totalprice,settotalprice]=useState(0)
    
    let calctotalamount=()=>{
        return cart.reduce((total,item)=> total+(item.price * item.qty),0);
    }
    
    let [name, setName] = useState("")
    let [address, setAddress] = useState("");
    let [pincode, setPincode] = useState("")
    let [phoneNumber, setPhoneNumber] = useState("")
    let buyNow = async () => {
        if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
            return toast.error("All fields are required", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }
        let addressinfo = {
            name,
            address,
            pincode,
            phoneNumber,
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        }
        var options = {
            key: "",
            key_secret: "",
            amount: parseInt(grandTotal * 100),
            currency: "INR",
            order_receipt: 'order_rcptid_' + name,
            name: "E-Bharat",
            description: "for testing purpose",
            handler: function (response) {
                console.log(response)
                toast.success('Payment Successful')

                let payment_id = response.razorpay_payment_id
                let orderInfo = {
                    cartItems,
                    addressInfo,
                    date: new Date().toLocaleString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }
                    ),
                    email: JSON.parse(localStorage.getItem("user")).user.email,
                    userid: JSON.parse(localStorage.getItem("user")).user.uid,
                    payment_id
                }
                try {
                    const result = addDoc(collection(fireDB, "orders"), orderInfo)
                } catch (error) {
                    console.log(error)
                }
            },


            theme: {
                color: "#3399cc"
            }
        };
        var pay = new window.Razorpay(options);
        pay.open();
        console.log(pay)
    }


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
                                    <h1>Total Amounts: Rs. {calctotalamount()}</h1>
                                    <button type="button" className='py-3 px-5 bg-pink-400 rounded-lg cursor-pointer focus:bg-pink-500'>Checkout</button>
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
        </>
    )
}

export function CartItem({ data }) {
    let { cart, setcart } = useContext(cartcontaxt)

    let { id, name, price, image, qty } = data
    let [cartitemqty, setcartitemqty] = useState(qty)
    useEffect(() => {
        let finalqty = cart.filter((item) => {
            if (item.id == id) {
                item['qty'] = cartitemqty
            }
            return item
        })
    }, [cartitemqty])
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