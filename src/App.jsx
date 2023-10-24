import { Routes,Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import FindByCategory from "./pages/FindByCategory/FindByCategory"
import GetProduct from "./pages/GetProduct/GetProduct"
import Dashboard from "./pages/dashboard/Dashboard";
import AddProductPage from "./pages/dashboard/AddProductPage";
import AddCategoryPage from "./pages/dashboard/AddCategoryPage"
import Buy from "./pages/buy/Buy"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/category/:_id" element={<FindByCategory/>} />
        <Route path="/electronic/:_id" element={<GetProduct/>}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/addproduct" element={<AddProductPage />}/>
        <Route path="/addcategory" element={<AddCategoryPage />}/>
        <Route path="/buy/:_id" element={<Buy/>}/>
      </Routes>
    </>
  )
}

export default App
