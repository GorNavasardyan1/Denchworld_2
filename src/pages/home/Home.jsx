import React, { useContext, useEffect, useState } from 'react'
import Loading from '../../components/loading/Loading'
import './Home.css'
import Header from '../../components/header/Header'
import { GetAllCategories } from '../../api'
import FindAllCategories from '../../components/FindAllCategories'
import GetAllProducts from '../../components/GetAllProducts'
import Carousel from '../../components/carusel/Carusel'
import Basket from '../../components/basket/Basket'
import { Context } from '../../App'

export default function Home() {
  const [categories,setCategories] = useState([])
  const [loading,setLoading] = useState(true)
  const {add,showBasket} = useContext(Context)
  useEffect(() => {
    GetAllCategories().then(data => {
      setCategories(data)
      setLoading(false)
    })
  },[])


  return (
    <>
      {loading && <Loading/>}
      {!loading && 
        <div>
        <Header/>
        {showBasket && <Basket/>}
        <Carousel/>
        <FindAllCategories categories={categories}/>
        <GetAllProducts add={add} />
      </div>
      }
    </>
  )
}

