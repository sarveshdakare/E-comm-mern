import React, { useEffect } from 'react';
import  {  useState } from 'react';
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const UpdateProduct = () => {

    const [name, setname] = useState('');
    const [price, setprice] = useState('');
    const [category, setcategory] = useState('');
    const [company, setcompany] = useState('');
    const param=useParams();
const navigate=useNavigate();

useEffect(()=>{
getProductDetail();
},[])

const getProductDetail=async()=>{
  console.log(param)
  let result=await fetch(`http://localhost:5000/product/${param.id}`,
  {
    headers:{
      authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
  result=await result.json();
  console.log(result.name)
  setname(result.name)
  setprice(result.price)
  setcategory(result.category)
  setcompany(result.company)
}

    const UpdateProduct=async()=>{
        console.log(name,price,category,company)
        let result=await fetch(`http://localhost:5000/products/${param.id}`,{
          method:'Put',
          body:JSON.stringify({name,price,category,company}),
          headers:{
            'Content-Type':"application/json",
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        })
        result=await result.json()
         console.log(result)
         navigate('/')

    }

  return (
    <div className='signup'>
        <h1>update Product</h1>
        <input type="text" className="input-box" placeholder='Enter Product Name'  value={name} onChange={(e)=>setname(e.target.value)} />
        
        <input type="text" className="input-box" placeholder='Enter Price' value={price} onChange={(e)=>setprice(e.target.value)} />
      
        <input type="text" className="input-box" placeholder='Enter Category' value={category} onChange={(e)=>setcategory(e.target.value)} />
      
        <input type="text" className="input-box" placeholder='Enter Company' value={company} onChange={(e)=>setcompany(e.target.value)} />

        <button className='btn' onClick={UpdateProduct}>update Product</button>
    </div>
  )
}

export default UpdateProduct