import { useEffect, useState } from 'react'
import { AllProducts } from '../api'
import { useNavigate } from 'react-router-dom'

export default function GetAllProducts() {
    const [allProducts,setAllProducts] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        AllProducts().then(data => {
            console.log(data);
            setAllProducts(data.posts)
        })
    },[])

  return (
    <>
        <div className=' container mx-auto'>
            <h1 className=' text-center font-semibold text-[26px]'>Լավագույն ապրանքներ</h1>
            <div className=' grid sm:grid-cols-2 lg:grid-cols-4'>
                {
                    allProducts.map(el => <div key={el._id}
                    className=' flex justify-center items-center flex-col m-4 p-4 cursor-pointer rounded-[10px] duration-300 hover:shadow-lg'
                    onClick={() => {
                        localStorage.setItem('productID',el._id)
                        navigate('/electronic/' + el._id) }}>
                            <img src={'http://localhost:5000/' + el?.photos[0]?.url.slice(7)} alt="" className='h-[230px] w-[230px]'/>
                            <div className='font-semibold'>{el.title}</div>
                            <div>{el.price} ֏</div>
                    </div>)
                }
            </div>
        </div>
    </>
  )
}
