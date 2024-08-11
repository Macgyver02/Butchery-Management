// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await axios.get('/products');
    setProducts(response.data);
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/products', newProduct);
    setNewProduct({ name: '', description: '', price: 0, stock: 0 });
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <div>
      <h1>Butchery Management System</h1>
      <form onSubmit={handleSubmit}>
        {/* ... */}
      </form>
      <table>
        <thead>
          {/* ... */}
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;