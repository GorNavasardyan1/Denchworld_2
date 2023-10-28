import React, { useEffect, useState } from 'react'
import Loading from '../../components/loading/Loading'
import './Home.css'
import Header from '../../components/header/Header'
import { GetAllCategories } from '../../api'
import FindAllCategories from '../../components/FindAllCategories'
import GetAllProducts from '../../components/GetAllProducts'
import Carousel from '../../components/carusel/Carusel'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Basket from '../../components/basket/Basket'

export default function Home() {
  const [categories,setCategories] = useState([])
  const [loading,setLoading] = useState(true)
  const [addToBasket,setAddToBasket] = useState([])
  const [showBasket,setShowBasket] = useState(false)
  useEffect(() => {
    GetAllCategories().then(data => {
      setCategories(data)
      setLoading(false)
    })
  },[])




  /////////////////// basket logic
  const add = (product) => {
    const index = addToBasket.findIndex(el => el._id == product._id)
    if(index == -1) {
      const newProduct = {
        ...product,
        quantity: 1
      }
      setAddToBasket([...addToBasket,newProduct])
    } else {
      const newProduct = addToBasket.map(el => {
        if(el._id === product._id) el.quantity = el.quantity + 1
        return el
      })
      setAddToBasket(newProduct)
    }
  }
  const plus = (id) => {
    const newProduct = addToBasket.map(el => {
      if(el._id === id) el.quantity++
      return el
    })
    setAddToBasket(newProduct)
  }
  const minus = (id) => {
    const newProduct = addToBasket.map(el => {
      if(el._id === id) el.quantity = el.quantity > 1 ? el.quantity -1 : 1
      return el
    })
    setAddToBasket(newProduct)
  }
  const remove = (product) => {
    const newProduct = addToBasket.filter(el => el._id !== product._id)
    setAddToBasket(newProduct)
  }



  return (
    <>
      {loading && <Loading/>}
      {!loading && <div>
        <Header setShowBasket={setShowBasket} showBasket={showBasket} addToBasket={addToBasket}/>
        {addToBasket.length == 0 && showBasket ? <p className=' absolute right-2'>Զամբյուղը դատարկ է</p> : showBasket && <Basket addToBasket={addToBasket} remove={remove} plus={plus} minus={minus}/>}
        <Carousel/>
        <FindAllCategories categories={categories}/>
        <GetAllProducts add={add}/>
      </div>}
    </>
  )
}

