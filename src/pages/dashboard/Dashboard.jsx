import AdminNavigation from "../../components/admin/AdminNavigation";
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";
import { GetProductsByCategory } from '../../api';
import { GetAllCategories } from '../../api';
import Loading from '../../components/loading/Loading'
//components

import { useState,useEffect } from "react";

export default function Hashboard() {
    const [loading,setLoading] = useState(false)
    //jwt token
    const token = localStorage.getItem("jwtToken");
    let userData;
    let tokenTime;
    if(token){
       userData = jwt_decode(token);
       tokenTime = userData.exp -  Math.floor(Date.now() / 1000);
    }
    if(tokenTime < 0) {
        localStorage.setItem("jwtToken", "");
        userData = {};
    }
     //get all category
     const [categories,setCategories] = useState([]);
     const [lastId, setLastId] = useState('');
     const [selectedCategory, setSelectedCategory] = useState('');
     useEffect(()=>{
         GetAllCategories().then(data => {
            setCategories(data);
            console.log(data)
            if (!lastId && data.length > 0) {
                setLastId(data[0]._id);
                setSelectedCategory(data[0]._id);
            }
         })
     },[])

    //get products
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        setLoading(true)
        GetProductsByCategory(lastId, 0,100).then((data)=>{
            setProducts(data)
            console.log(data)
            setLoading(false)
        })
    },[lastId])
    //delete product 
    const deleteProduct = async (id) => {
        toast.loading('Deleting',{id:'1'})
        try {
            const response = await fetch(`https://backendv1.vercel.app/post/deleteproduct?id=${id}`,{
            method: 'DELETE'
            })
            const data = await response.json();
            if(response.status == 200){
                toast.success(data.message,{id:'1'})
            } 
        } catch (error) {
            console.log("error")
        }
    }
    return <>
   {loading ? (
  <Loading />
) : (
  userData?.roles?.[0] === "ADMIN" ? (
    <div>
      <AdminNavigation />
      <div className="flex pl-2">
        <h2 className="text-2xl text-gray-900 dark:text-white">Token Time: {Math.ceil(tokenTime / 60 / 60) + "H"}</h2>
      </div>
      <div className="flex pl-2">
        <h2 className="text-2xl text-gray-900 dark:text-white">Select category:</h2>
      <select
        class="block max-w-[200px] p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name="category"
        id="category"
        value={selectedCategory}
        onChange={(e) => {
          setLastId(e.target.value);
          setSelectedCategory(e.target.value);
        }}
      >
        {categories.map((el) => (
          <option className="max-w-[200px]" key={el._id} value={el._id}>
            {el.name}
          </option>
        ))}
      </select>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Delete</th>
          </tr>
        </thead>
        {products?.products?.length && products?.products.map((el) => (
          <tbody key={el._id}>
            <tr>
              <td className="text-center">
                <img className="block m-auto" src={el?.photos[0]?.url} width="200px" height="200px" />
              </td>
              <td className="text-center">{el.title}</td>
              <td className="text-center">{el.price}</td>
              <td className="text-center">
                <span >
                  <button
                    onClick={() => deleteProduct(el._id)}
                    className="my-2 text-[14px] font-serif text-white bg-sky-500 rounded-3xl px-8 py-2"
                  >
                    Delete
                  </button>
                </span>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  ) : (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex items-center text-[40px]">
        <p className="text-[30px] mr-2">404</p>|
        <p className="ml-2 text-[30px]">Not found</p>
      </div>
    </div>
  )
)}
    </>
}