import React, { useEffect, useRef, useState } from 'react'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleUp, faPhoneVolume } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faInstagramSquare, faTelegram, faViber, faWhatsapp } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import emailjs from '@emailjs/browser';
import validator from 'validator'


export default function Footer() {
    const [email,setEmali] = useState('')
    const [emailCorrect,setEmailCorrect] = useState(false)
    const upHandler = () => {
        window.scrollTo({top:0,behavior:'smooth'})
    }

    useEffect(() => {
        if(validator.isEmail(email)) setEmailCorrect(true)
        else setEmailCorrect(false)
      },[email])
    

    const form = useRef()
    const submitHandler = (e) => {
        e.preventDefault()
        if(emailCorrect) {
          emailjs.sendForm('service_mkw0mt5', 'template_e3975b9', form.current, '6Q_XrxKfcRkXA0okJ')
          .then((result) => {
              console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
            e.target.reset()
        } 
    }
  
  return (
    <>
    <div className=' w-full bg-black'>
        <div className='fAllFonts fAll container mx-auto flex justify-between '>
            <div className=' m-4 flex flex-col '>
                <div className='h-[80px] w-[280px]'>
                    <img src="/icon.png" className=' h-full w-full' alt=""/>
                </div>
                <div className=' grid grid-cols-2'>
                    <div className='fAllFonts mt-4 text-white text-[16px] font-semibold'>
                        <div className='m-4'>
                            <Link to={'/about'} className=' hover:border-b'>Մեր մասին</Link>
                        </div>
                        <div className='m-4 text-white font-semibold'>
                            <Link to={'/contact'} className=' hover:border-b'>Ապառիկի պայմաններ</Link>
                        </div>
                        <div className=''>
                            <p className=' m-4'>Շուրջօրյա հեռախոսահամար
                                <span className=' block'><FontAwesomeIcon icon={faPhoneVolume}/> 123456</span>
                            </p>
                        </div>
                    </div>
                    <div className=' m-4 text-white font-semibold'>
                    <div className='m-4'>
                            <a href={'/contact'} className='hover:border-b'>Կապ մեզ հետ</a>
                        </div>
                        <p className=' mt-4 ml-4'>Մեզ հետ կարող եք նաև կապ հաստատել</p>
                            <div className=' ml-4'>
                                <FontAwesomeIcon icon={faViber}className=' h-[20px] m-1'/>
                                <FontAwesomeIcon icon={faWhatsapp}className=' h-[20px] m-1'/>
                                <FontAwesomeIcon icon={faTelegram}className=' h-[20px] m-1'/>
                            </div>
                        <p className='text-white mt-4 ml-4 font-semibold'>Միացեք մեզ նաև սոցիալական ցանցերում</p>
                        <div className=' text-white ml-4 mt-2'>
                            <Link to={'https://facebook.com/'} target='_blank'>
                                <FontAwesomeIcon icon={faFacebookSquare} className=' h-[20px] ml-2 mr-2'/>
                            </Link>
                            <Link to={'https://instagram.com/'} target='_blank'>
                                <FontAwesomeIcon icon={faInstagramSquare}className=' h-[20px] '/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
                <div className=''>
                <div className=''>
                    <form action="" className='m-8' ref={form} onSubmit={submitHandler}>
                        <h1 className=' text-white text-2xl mb-4'>Արագ կապ</h1>
                        <p className='fAllFonts text-white text-[16px] font-semibold mb-4'>Ուղարկեք ձեր էլ. հասցեն կամ <br /> հեռախոսահամարը</p>
                        <div className='fInputBlock flex rounded-lg overflow-hidden'>
                            <input type="text" required={true}  name='user_email' onChange={(e) => setEmali(e.target.value)} className={email.length == 0 || emailCorrect ? ' p-2 outline-none w-[280px] bg-[#232529] focus:bg-white duration-300  text-black' 
                            : ' p-2 outline-none w-[280px] bg-[#232529] focus:bg-white duration-300  text-red-600' }/>
                            <input type="submit" value="Ուղարկել!" className=' text-white bg-[#232529] px-2 py-2 rounded-tr-lg rounded-br-lg cursor-pointer' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div className=' flex justify-center items-center cursor-pointer h-[40px] overflow-hidden w-full bg-[#232529] duration-700 ' onClick={upHandler}>
            <FontAwesomeIcon icon={faAngleUp} className='h-[40px] w-full border-t-2 text-white duration-700 '/>
        </div>
    </div>
    </>
  )
}
