import React, { useEffect, useState } from 'react'
import Loading from '../../components/loading/Loading'
import './Home.css'
import Header from '../../components/header/Header'
import { GetAllCategories } from '../../api'
import FindAllCategories from '../../components/FindAllCategories'
import GetAllProducts from '../../components/GetAllProducts'
import Carousel from '../../components/carusel/Carusel'

export default function Home() {
  const [categories,setCategories] = useState([])
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    GetAllCategories().then(data => {
      setCategories(data)
      setLoading(false)
    })
  },[])

  return (
    <>
      {loading && <Loading/>}
      {!loading && <div>
        <Header/>
        <Carousel/>
        <FindAllCategories categories={categories}/>
        <GetAllProducts/>
      </div>}
    </>
  )
}

