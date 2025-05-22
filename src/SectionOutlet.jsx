import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { cartcontaxt } from './Maincontext'
import { ToastContainer, toast } from 'react-toastify';

export default function SectionOutlet() {
    let [count, setCount] = useState(0)
    let [category, SetCategory] = useState([])
    let [brand, SetBrands] = useState([])

    let [product, SetProduct] = useState([])
    let getCategory = () => {
        axios.get(`https://wscubetech.co/ecommerce-api/categories.php`)
            .then((res) => {
                return res.data
            })
            .then((finaldata) => {
                SetCategory(finaldata.data)
            })
    }
    let getBrand = () => {
        axios.get(`https://wscubetech.co/ecommerce-api/brands.php`)
            .then((res) => {
                return res.data
            })
            .then((finalres) => {
                SetBrands(finalres.data)
            })
    }
    let [categoryFilter, setCategoryFilter] = useState([])
    let [brandFilter, setBrandFilter] = useState([])


    let getAllcategoryCheckedValue = (event) => {
        if (event.target.checked) {
            if (!categoryFilter.includes(event.target.value)) {
                setCategoryFilter([...categoryFilter, event.target.value])
            }
        }
        else {
            let getunchecked = categoryFilter.filter((item) => item != event.target.value)
            setCategoryFilter(getunchecked)
        }
    }


    let getAllbrandCheckedValue = (event) => {
        if (event.target.checked) {
            if (!brandFilter.includes(event.target.value)) {
                setBrandFilter([...brandFilter, event.target.value])
            }
        }
        else {
            let getunchecked = brandFilter.filter((item) => item != event.target.value)
            setBrandFilter(getunchecked)
        }
    }

    let [priceFilter, setPriceFilter] = useState({ from: null, to: null })
    let priceOptions = [
        { from: 10, to: 250 },
        { from: 250, to: 500 },
        { from: 500, to: 1000 },
        { from: 1000, to: 100000 }
    ]
    let getAllPriceCheckedValue = (event) => {
        let getPrice = priceOptions[event.target.value]
        setPriceFilter({ from: getPrice.from, to: getPrice.to })
    }

    let [ratingFilter, setRatingFilter] = useState(null)

    let [sorting, setSorting] = useState(null)
    let getProduct = () => {
        axios.get(`https://wscubetech.co/ecommerce-api/products.php`, {
            params: {
                page: 1,
                limit: 15,
                categories: categoryFilter.join(','),
                brands: brandFilter.join(','),
                price_from: priceFilter.from,
                price_to: priceFilter.to,
                discount_from: null,
                discount_to: null,
                rating: ratingFilter,
                sorting: sorting
            }
        })
            .then((result) => {
                return result.data
            })
            .then((finaldata) => {
                SetProduct(finaldata.data)
            })
    }

    useEffect(() => {
        getBrand()
        getCategory()

    }, [])

    useEffect(() => {
        getProduct()
    }, [sorting, categoryFilter, brandFilter, priceFilter, ratingFilter])

    return (
        <>
            <ToastContainer />
            <section className='w-full p-9 '>


                <nav class="flex" aria-label="Breadcrumb">
                    <ol class="inline-flex mb-5 items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li class="inline-flex items-center">
                            <a href="#" class="inline-flex items-center text-2xl font-semibold text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                Home
                            </a>
                        </li>
                        <li>
                            <div class="flex items-center">
                                <p className='font-semibold text-2xl'>/</p>
                                <a href="#" class="ms-1 text-2xl font-semibold text-black hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white">Clothing</a>
                            </div>
                        </li>
                        <li aria-current="page">
                            <div class="flex items-center">
                                <p className='font-semibold text-2xl'>/</p>
                                <span class="ms-1 text-2xl font-semibold text-black md:ms-2 dark:text-gray-400">Men T-shirts</span>
                            </div>
                        </li>
                    </ol>
                </nav>
                <p className='text-xl text-gray-600 flex gap-3 items-center my-5'>
                    <span className='font-bold text-black text-2xl'>Men T-shirts</span>- 126446 shirts
                </p>
                <p className='font-semibold text-2xl flex gap-5 my-8 grid grid-cols-[70%_auto] items-center'>
                    <span className='flex gap-6 items-center'>
                        <h1 >Filter</h1>
                        <h2 className='text-red-600'>Clear</h2>
                    </span>

                    <div>
                        <button id="dropdownDelayButton" onClick={() => setCount(count == 0 ? 1 : 0)} class="font-medium w-full rounded-lg text-lg px-4 relative py-5 text-center inline-flex cursor-pointer items-center border" type="button">Sort By: Recommended <svg class="w-5 h-5 absolute right-[15px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                        </svg>
                        </button>


                        <div id="dropdownDelay" class="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 w-full">
                            <ul className={count == 1 ? 'block' : 'hidden'} aria-labelledby="dropdownDelayButton">
                                <li onClick={() => setSorting(1)}>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">A to Z</a>
                                </li>
                                <li onClick={() => setSorting(2)}>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Z to A</a>
                                </li>
                                <li onClick={() => setSorting(3)}>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Price Low to High</a>
                                </li>
                                <li onClick={() => setSorting(4)}>
                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Price High to Low</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </p>

                <div className="grid grid-cols-[20%_auto] gap-5">

                    <div className="border p-3 text-xl">
                        <div className="">
                            <h2 className='font-semibold mb-3'>Categories</h2>
                            <ul className='h-40 overflow-auto'>
                                {
                                    category.map((item, index) => {
                                        return (
                                            <li key={index} className='flex gap-3 text-2xl'>
                                                <input type="checkbox" onChange={getAllcategoryCheckedValue} name="" value={item.slug} id="" />{item.name}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="mt-5">
                            <h2 className='font-semibold mb-3'>Brands</h2>
                            <ul className='h-40 overflow-auto'>
                                {
                                    brand.map((IoTimeSharp, i) => {
                                        return (

                                            <li key={i} className='flex gap-3 text-2xl'>
                                                <input type="checkbox" onChange={getAllbrandCheckedValue} name="" id="" value={IoTimeSharp.slug} />{IoTimeSharp.name}
                                            </li>
                                        )
                                    })
                                }

                            </ul>
                        </div>
                        <div className="mt-5">
                            <h2 className='font-semibold mb-3'>Price</h2>
                            <ul className='h-40 overflow-auto'>
                                {
                                    priceOptions.map((item, index) => {
                                        return (
                                            <li key={index} className='flex gap-3 text-2xl'>
                                                <input type="radio" onChange={getAllPriceCheckedValue} checked={priceFilter.from == item.from && priceFilter.to == item.to} name="radio" id="" value={index} />From {item.from} - To {item.to}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="mt-5">
                            <h2 className='font-semibold mb-3'>Rating</h2>
                            <ul className='h-40 overflow-auto'>
                                <li className='flex gap-3 text-2xl'>
                                    <input type="radio" name="radio" id="" value={1} onChange={() => setRatingFilter(1)} />1 Star and Above
                                </li>
                                <li className='flex gap-3 text-2xl'>
                                    <input type="radio" name="radio" id="" value={2} onChange={() => setRatingFilter(2)} />2 Star and Above
                                </li>
                                <li className='flex gap-3 text-2xl'>
                                    <input type="radio" name="radio" id="" value={3} onChange={() => setRatingFilter(3)} />3 Star and Above
                                </li>
                                <li className='flex gap-3 text-2xl'>
                                    <input type="radio" name="radio" id="" value={4} onChange={() => setRatingFilter(4)} />4 Star and Above
                                </li>
                                <li className='flex gap-3 text-2xl'>
                                    <input type="radio" name="radio" id="" value={5} onChange={() => setRatingFilter(5)} />5 Star and Above
                                </li>
                            </ul>
                        </div>

                    </div>
                    <div className=" grid lg:grid-cols-4 sm:grid-cols-3 justify-between gap-3">
                        {
                            product.length >= 1
                                ?
                                product.map((item, index) => {
                                    return (
                                        <Productitems item={item} key={index} />
                                    )
                                })
                                :
                                "No data found"
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
function Productitems({ item }) {
    let { cart, setcart } = useContext(cartcontaxt)

    
    let { name, image, price, rating, id } = item

    let addtocard = () => {
        console.log(item)
        let cartobj = {
            name,
            image,
            price,
            id,
            qty:1
            

        }
        setcart([...cart, cartobj])
        toast.success("Item Added to Cart");

    }
    let removecart = () => {
        if(confirm("Are you want to remove it?")) {
            let finalcart = cart.filter((item) => item.id != id)
            setcart(finalcart)
            toast("Item in Cart is deleted!")
        }
    }
    let cartid = cart.filter((Item) => Item.id == id)

    return (


        <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                <img class="p-8 rounded-t-lg" src={image} alt="product image" />
            </a>
            <div class="px-5 pb-5">
                <a href="#">
                    <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>
                </a>
                <div class="flex items-center mt-2.5 mb-5">

                    <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">{rating}</span>
                </div>
                <div class="flex items-center justify-between">
                    <span class="text-3xl font-bold text-gray-900 dark:text-white">${price}</span>
                    {
                        cartid.length >= 1 ?
                            <button type="button" className='text-white bg-red-600 cursor-pointer rounded-lg text-sm px-5 py-3 text-center' onClick={removecart}>Remove</button> :
                            <button type="button" className="text-white bg-blue-700 cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={addtocard}>Add to cart</button>
                    }

                </div>
            </div>
        </div>

    )
}