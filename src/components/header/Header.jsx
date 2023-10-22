import React from 'react'
import './Header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons'



export default function Header() {
  return (
    <div>
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


        <div className='logo h-[92px] w-full  bg-white flex items-center justify-start p-8'>
            <div className='logo w-full max-w-[1400px] mx-auto '>
                <img src="/icon.png" alt="" className=' h-[60px]' />
            </div>
        </div>
    </div>
  )
}
