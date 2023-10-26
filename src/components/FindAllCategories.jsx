import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function FindAllCategories({categories}) {
    const navigate = useNavigate()
  return (
    <>
    <div className=' container mx-auto'>
        <h1 className=' font-semibold text-[26px] text-center'>Ըստ կատեգորիայի</h1>
        <div className=' grid sm:grid-cols-2 lg:grid-cols-4 border-t-2 border-b-2'>
            {
              categories.map(el => <div key={el._id}
                className='flex justify-center items-center flex-col m-4 p-4 cursor-pointer duration-300 hover:shadow-lg'
                onClick={() => navigate('/category/' + el._id)} >
                    <img src={el.photo} alt="" 
                    className=' h-[250px] w-[300px]'/>
                    <div>{el.name}</div>
                </div>)
            }
        </div>
      </div>
    </>
  )
}
