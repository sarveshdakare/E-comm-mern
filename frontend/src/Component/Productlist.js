
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'

const Productlist = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const result = await fetch('http://localhost:5000/products',{
      headers:{
        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    const data = await result.json();


    setProducts(data);
  };

  const deleteProduct = async (id) => {
    const result = await fetch(`http://localhost:5000/product/${id}`, {
      method: 'DELETE',
      
        headers:{
          authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      
    });
    const data = await result.json();
    if (data) {
      getProducts();
    }
  };

  const searchHandle=async(e)=>{
let key=e.target.value;

if(key){
  let result=await fetch(`http://localhost:5000/search/${key}`,{
    headers:{
      authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  })
  result=await result.json()
  if(result){
  setProducts(result)
  }
}else{
  getProducts()
}


  }

  return (
    <div className='product-list'>
      <h1>Product List</h1>
      <input type="text" placeholder='search the product' className='search-box' onChange={searchHandle}/>
      <ul>
        <li>Sr. No.</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Operations</li>
      </ul>

      {products.length>0 ?
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{index + 1}</li>
            <li>{item.name}</li>
            <li>${item.price}</li>
            <li>{item.category}</li>
            <li>
              <button onClick={() => deleteProduct(item._id)}>Delete</button>
              <Link to={"/update/"+item._id}>Update</Link>
            </li>
          </ul>
        ) 
        
        )
        : <h1>No Result</h1>
        }
    </div>
  );
};

export default Productlist;
