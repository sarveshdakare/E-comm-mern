import React, { useState } from 'react'


const Addproduct = () => {
    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');
    const [company, setcompany] = useState('');
    const [error, setError] = useState(false)

const submit=async()=>{
    console.log(name,price,category,company);

if(!name && !price && !category && !company){
setError(true)
return false;
}

const userId=JSON.parse(localStorage.getItem('user'))._id;
console.log(userId);
let result=await fetch('http://localhost:5000/add-product',{
    method:'Post',
    body:JSON.stringify({name,price,category,company,userId}),
    headers:{
        "Content-Type":"application/json",
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    },
   
});
result=await result.json()
console.log(result)
    
}

  return (
    <div className='signup'>
        <h1>Add Product</h1>
        <input type="text" className="input-box" placeholder='Enter Product Name'  value={name} onChange={(e)=>setname(e.target.value)} />
        {error && !name && <span className='invalid'>Enter Valid Name</span>}
        <input type="text" className="input-box" placeholder='Enter Price' value={price} onChange={(e)=>setprice(e.target.value)} required/>
        {error && !price && <span className='invalid'>Enter Valid Price</span>}
        <input type="text" className="input-box" placeholder='Enter Category' value={category} onChange={(e)=>setcategory(e.target.value)} required/>
        {error && !category && <span className='invalid'>Enter Valid Category</span>}
        <input type="text" className="input-box" placeholder='Enter Company' value={company} onChange={(e)=>setcompany(e.target.value)} required/>
        {error && !company && <span className='invalid'>Enter Valid Company</span>}
        <button className='btn' onClick={submit}>Add Product</button>
    </div>
  )
}

export default Addproduct