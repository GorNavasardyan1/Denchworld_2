import AdminNavigation from "../../components/admin/AdminNavigation";
import jwt_decode from "jwt-decode";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useState, useEffect } from "react";
import { GetAllCategories } from '../../api';
export default function AddCategory() {
    const token = localStorage.getItem("jwtToken");
    let userData;
    if(token){
       userData = jwt_decode(token);
    }
    //create new category
    const [isDeleted, setIsDeleted] = useState(false);
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setImage(...selectedFiles);
    };
    const createCategory = async (e) => {
        e.preventDefault();
        toast.loading('Creating category...',{id:'1'})
        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', image);
        const response = await fetch('https://backendv1.vercel.app/post/addcategory', {
            method: "POST",
            body: formData
        })
        const data = await response.json();
        if(response.status == 201){
            setIsDeleted(true)
            toast.success(data.message,{id:'1'})
        } else {
            toast.error(data.message,{id:'1'})
        }
    }

    //get all category
    const [categories,setCategories] = useState([])
    useEffect(()=>{
        GetAllCategories().then(data => {
            setCategories(data)
            setIsDeleted(false)
        })
    },[isDeleted])
    //delete category 
    const deleteCategory = async (id) => {
        toast.loading('Deleting category...',{id:'1'})
        try {
            const response = await fetch(`https://backendv1.vercel.app/post/deletecategory?id=${id}`,{
            method: 'DELETE'
            })
            const data = await response.json();
            console.log(data)
            if(response.status == 200){
                toast.success(data.message,{id:'1'})
                setIsDeleted(true)
            } 
        } catch (error) {
            toast.error(error)
            console.log("error")
        }
    }
    return <>
    {  userData?.roles?.[0] === "ADMIN" && <div>
            <AdminNavigation />
        <form onSubmit={createCategory} className=" my-4 flex justify-center flex-col items-center">
            <div className="mt-4">
                <label htmlFor="name" className=" font-semibold text-[14px] ">Category Name</label>
                <input placeholder="name*" className="ml-1 p-2 outline-none border-2 " id="name" type="text" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
                <div class="flex items-center justify-center w-full">
                    <label for="dropzone-file" class="flex flex-col items-center justify-center mt-4 w-full h-64 border-t-2 border-b-2 border-gray-300 border-dashed  cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                 <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                <p>{image?.name}</p>
                </div>
                <input id="dropzone-file" class="hidden" type="file" accept="image/*" onChange={handleFileChange} />
                </label>
                </div>
          
            
            <div className="mt-4">
            <input className=" cursor-pointer text-[14px] text-white bg-sky-500 rounded-3xl px-8 py-2" type="submit" value="Add Category" />
            </div>
        </form>
       <div className="grid sm:grid-cols-2 lg:grid-cols-3 border-slate-400 border-t-2 border-b-2 ">
            {
                categories.map(el=><div key={el._id} className="text-center flex justify-center items-center flex-col ">
                    <img src={el.photo} alt="" width="100px" height="100px"/>
                    <div>
                        <h3 className="my-2">{el.name} </h3>
                        <p className="my-2">Products in category: {(el.products).length}</p>
                        <button  onClick={()=>deleteCategory(el._id)} className="my-2 text-[14px] text-white bg-sky-500 rounded-3xl px-8 py-2">Delete</button>
                        </div>
                </div>)
            }
       </div>
           </div>
           || <div className=" flex justify-center items-center h-[100vh]">
           <p className=" flex items-center text-[40px]">
          <p className=" text-[30px] mr-2"> 404 </p>|<p className="ml-2 text-[30px]">Not found</p>
           </p>
      </div>
    }
    </>
}