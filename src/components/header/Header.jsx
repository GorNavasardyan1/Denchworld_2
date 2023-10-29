import React from 'react'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'



export default function Header({showBasket,setShowBasket,addToBasket}) {




    return (
    <>
        <div className=' fixed w-full z-[10000]'>
            <div className=' w-full bg-black'>
            <div className='topHeader flex justify-around items-center text-[#A2A6B0] font-semibold text-[12px] h-[44px] w-full max-w-[1400px] mx-auto '>
                    <div>
                        <span >Երկ-Կիր:<span className=' text-white ml-2'>9:00 AM - 5:30 PM</span></span>
                    </div>
                    <div>
                        <span className=' hasce' >Այցելեք մեր ցուցասրահը Փողոց Հասցե Քաղաք Հասցե,<span className=' text-white ml-2 border-b border-white cursor-pointer'>Կապ մեզ հետ</span></span>
                    </div>
                    <div>
                        <span className='flex items-center text-white'>Call Us: (00) 1234 5678:
                        <div className=' ml-4'>
                            <FontAwesomeIcon icon={faFacebookSquare} className='mr-2 h-[20px]' />
                            <FontAwesomeIcon icon={faInstagramSquare} className=' h-[20px]' />
                        </div>
                        </span>
                    </div>
                </div>
            </div>

            <div className='logo h-[70px] w-full  bg-slate-100 flex items-center justify-start p-8'>
                <div className='logo w-full max-w-[1400px] mx-auto flex justify-between items-center '>
                    <img src="/icon.png" alt="" className=' h-[40px]' />
                    <div onClick={() => setShowBasket(!showBasket)} className=' cursor-pointer'>
                        <FontAwesomeIcon  icon={faShoppingCart} fade className='sm:h-[25px] sm:w-[25px]  lg:h-[30px] lg:w-[30px]'/>
                        {addToBasket.length > 0 ? <div className=' inline lg:bg-black lg:text-white font-semibold lg:px-1.5 lg:py-0.5 rounded-full'>
                            {addToBasket.length > 0 ? addToBasket.length : ''}
                        </div> : ''}
                    </div>
                </div>
            </div>
        </div>
        <div className=' h-[120px]'></div>
    </>
  )
}
