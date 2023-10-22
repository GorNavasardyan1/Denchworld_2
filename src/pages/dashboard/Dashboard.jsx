import AdminNavigation from "../../components/admin/AdminNavigation";
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";
import { GetProductsByCategory } from '../../api';
import { GetAllCategories } from '../../api';
import Loading from '../../components/loading/Loading'
//components

import { useState,useEffect } from "react";

export default function Hashboard() {
    const [loading,setLoading] = useState(true)
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
     useEffect(()=>{
         GetAllCategories().then(data => {
            setCategories(data);
            console.log(data)
             if(!lastId){
                setLastId(data[0]._id);
             }
         })
     },[])

    //get products
    const [products, setProducts] = useState([]);
    useEffect(()=>{
        GetProductsByCategory(lastId).then((data)=>{
            setProducts(data)
            setLoading(!loading)
        })
    },[lastId])

    //delete product 
    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/post/deleteproduct?id=${id}`,{
            method: 'DELETE'
            })
            const data = await response.json();
            console.log(data)
            if(response.status == 200){
                toast.success(data.message)
                setIsDeleted(true)
            } 
        } catch (error) {
            console.log("error")
        }
    }
    
    return <>
    {loading && <Loading/>}
        {!loading &&
           userData?.roles?.[0] === "ADMIN" && <div>
            <AdminNavigation />
            <h2>Token Time: {Math.ceil(tokenTime/60/60) + "H"}</h2>
            <select name="category" id="category" onChange={(e)=>setLastId(e.target.value)}>
                {
                    categories.map(el=><option key={el._id} value={el._id} >{el.name}</option>)
                }
            </select>
            <table class="table-auto w-full">
            <thead>
                <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Delete</th>
                </tr>
            </thead>
            {
                    products.map(el=> <tbody key={el._id}>
                        <tr>
                        <td><img src={'http://localhost:5000/' + el?.photos[0]?.url.slice(7)} width="200px" height="200px"/></td>
                        <td>{el.title}</td>
                        <td><span><button onClick={()=>deleteProduct(el._id)} className="my-2 text-[14px] font-serif text-white bg-sky-500 rounded-3xl px-8 py-2">Delete</button></span></td>
                        </tr>
                    </tbody>)
            }
            </table>
           </div>
           || <div className=" flex justify-center items-center h-[100vh]">
           <p className=" flex items-center text-[40px]">
          <p className=" text-[30px] mr-2"> 404 </p>|<p className="ml-2 text-[30px]">Not found</p>
           </p>
      </div>
}
    </>
}