import { useEffect, useState } from 'react'
import { GetProductById } from '../../api'
import Carousel from 'react-multi-carousel'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faHome } from '@fortawesome/free-solid-svg-icons'
import Loading from '../../components/loading/Loading'
import './GetProduct.css'


export default function GetProduct() {
    const [product,setProduct] = useState([])
    const [counter,setCounter] = useState(0)
    const [loading,setLoading] = useState(true)
    const _id = localStorage.getItem('productID')
    useEffect(() => {
        GetProductById(_id).then(data => {
            console.log(data.producte);
            setProduct(data.producte)
            setLoading(false)
        })
    },[])




    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 3000 },
          items: 1,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
    };



  return (
    <>
    {loading && <Loading/>}
    {!loading &&  <div className='product flex lg:justify-between items-center'>
        <div className='info bg-[#F5F7FF] w-[764px] h-[100vh]'>
            <div className='info h-full w-full flex flex-col p-20'>
              <div className=' mb-8'>
                <Link to={'/'}className='mr-2'><FontAwesomeIcon icon={faHome}/>   Home</Link>
                <Link to={-1}><FontAwesomeIcon icon={faAngleLeft} fade/> Back</Link>
              </div>
                <div className='title font-bold text-[32px]'>{product.title}</div>
                <div className='desc text-justify'>{product.description}</div>
                <div className=' flex items-end h-full'>
                    <div className=' flex items-center'>
                      <button className='border-none bg-[#0156FF] text-white h-[50px] w-[151px] rounded-[40px]'>Ավելացնել քարտին</button>
                      <input type="number" min={1}  placeholder='1' className=' border-2 border-black rounded outline-none w-[60px] ml-2 p-2' onChange={(e) => setCounter(e.target.value)}/>
                      <div className=' ml-2'>{counter > 0 ? counter * product.price + '֏' : product.price + '֏'}</div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <Carousel responsive={responsive} className='text-red-200 mr-8 w-[500px] h-[500px]'>
                <img src={product.photos ? 'http://localhost:5000/' +  product?.photos[0]?.url?.slice(7) : ''} alt=""
                className=' rounded w-[500px] h-[500px] bg-cover'/>
                <img src={product.photos ? 'http://localhost:5000/' +  product?.photos[1]?.url?.slice(7) : ''} alt=""
                className=' rounded w-[500px] h-[500px] bg-cover'/>
            </Carousel>
        </div>
    </div>
  }
  </>
  )
}
