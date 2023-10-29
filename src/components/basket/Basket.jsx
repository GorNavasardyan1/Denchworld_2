import './Basket.css'
import { FaTrash } from 'react-icons/fa'


export default function Basket({addToBasket,remove,plus,minus}) {
  return (
    <div className=' bg-[#001D3D] p-4 absolute top-[20vh] right-0 z-[1000] rounded-[10px]' >
        {
        addToBasket.map(el => <div key={el._id} className=' text-xl text-white'>
                <div className=' flex justify-between items-center mt-2 '>
                    <div className='flex items-center'>
                        <img src={el.photos[0].url} className=' mr-2 h-[60px] w-[60px]' alt="" />
                        <span className='basketText mr-4'>{el.title}</span>
                    </div>
                    <div className='flex'>
                        <div className='basketText'>{el.price * el.quantity + ' ֏'}</div>
                        <button className=' pl-2 pr-2' onClick={() => minus(el._id)}>-</button>
                        <span className='basketText'>{el.quantity}</span>
                        <button className=' pl-2 pr-2' onClick={() => plus(el._id)}>+</button>
                        <button className=' pl-2 pr-2' onClick={() => remove(el)}><FaTrash/></button>
                    </div>
                </div>
            </div>)
        }
    </div>
  )
}
