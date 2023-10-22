export const GetAllCategories = async() => {
    const req = await fetch('http://localhost:5000/post/getallcategory')
    return req.json()
}

export const GetProductsByCategory = async(_id) => {
    const req = await fetch(`http://localhost:5000/post/getproductsincategory?id=${_id}&skip=${0}&limit=${50}`)
    return req.json()
}

export const AllProducts = async() => {
    const req = await fetch('http://localhost:5000/post/getallproducts')
    return req.json()
}


export const GetProductById = async(_id) => {
    const req = await fetch('http://localhost:5000/post/getproductbyid?id=' + _id)
    return req.json()
} 