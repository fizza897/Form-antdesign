import React, { useEffect, useState } from 'react';
import { Input, Drawer, TextField, Button } from '@mui/material';
import axios from 'axios';
export default function Products() {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [productTitle, setProductTitle] = useState("");
    const [productDescription, setProductDescription] = useState("")
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('https://dummyjson.com/products');
                const result = response.data;
                setProducts(result?.products || []);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, []);
    // const removeProduct = (product) => {
    //   axios.delete(`https://dummyjson.com/products/${product.id}`)
    //     .then((res) => {
    //       const updatedProducts = products.filter((p) => p.id !== product.id);
    //       setProducts(updatedProducts);
    //     })
    //     .catch((error) => console.error('Error deleting product:', error));
    // };
    const removeProduct = async (product) => {
        try {
            await axios.delete(`https://dummyjson.com/products/${product.id}`);
            const updatedProducts = products.filter((p) => p.id !== product.id)
            setProducts(updatedProducts);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };

    // const fetchProduct = (productId) => {
    //   axios.get(`https://dummyjson.com/products/${productId}`)
    //     .then((result) => {
    //       const productData = result.data;
    //       console.log(productData);
    //       alert(`Product Details:\nID: ${productData.id}\nTitle: ${productData.title}\nDescription: ${productData.description}`);
    //     })
    //     .catch((error) => console.error('Error fetching data:', error));
    // };

    const fetchProduct = async (productId) => {
        try {
            const respone = await axios.get(`https://dummyjson.com/products/${productId}`)
            const productData = respone.data
            console.log("productData................", productData)
            alert(`Product Details:\nID: ${productData.id}\nTitle: ${productData.title}\nDescription: ${productData.description}`);
        } catch (error) {
            console.error('Error deleting data:', error);
        }
    };
    const searchProduct = async () => {
        try {
            const response = await axios.get(`https://dummyjson.com/products/search?q=${searchQuery}`);
            const data = response.data.products;
            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    const addProduct1 = async () => {
        try {
            const response = await axios.post('https://dummyjson.com/products/add', {
                title: productTitle,
                description: productDescription,
            });
            const newProduct = response.data;
            setProducts((prevProducts) => [...prevProducts, newProduct]);
            setIsDrawerOpen(false);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };
    const fetchDataAndLog = () => {
        fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                console.log(data);
            });
    };

    const btnStyle = { 
        borderRadius: '5px',
         width: '5rem',
          background: '#0096FF', 
          color: '#fff',
          border: '1px solid #fff',
          cursor: 'pointer'
         };


    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                <div style={{ padding: "50px" }}></div>
                <Input
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={searchProduct} disabled={!searchQuery}>Search</button><br />
                    <button style={{...btnStyle, width: '7rem'}} onClick={toggleDrawer}>Add Product</button>
                </div>
            </div>
            <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
                <div style={{ width: '600px', padding: '16px' }}>
                    <h2>Add a Product</h2>
                    <TextField
                        label="Product Title"
                        variant="outlined"
                        style={{ margin: '1rem 0' }}
                        fullWidth
                        value={productTitle}
                        onChange={(e) => setProductTitle(e.target.value)}
                    />
                    <TextField
                        label="Product Description"
                        variant="outlined"
                        fullWidth
                        style={{ margin: '1rem 0' }}
                        multiline
                        rows={4}
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                    />
                    <Button variant="contained" color="primary" onClick={addProduct1}>
                        Add Product
                    </Button>
                </div>
            </Drawer>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '1rem', }}>
                {
                    products.map((product) => (
                        <div
                            key={product.id}
                            style={{
                                marginBottom: '1rem',
                                width: '20%',
                                padding: '1rem',
                                border: '1px solid gray',
                                borderRadius: '10px',
                            }}
                        >
                            <p>{product.title}</p>
                            <p>{product.description}</p>
                            <div style={{ display: 'flex', gap: '0.7rem' }}>
                                <button style={btnStyle} onClick={() => fetchProduct(product.id)}>View </button>
                                <button style={btnStyle} onClick={() => removeProduct(product)}>Remove </button>
                            </div>
                        </div>
                    ))
                }
            </div>

        </>
    )
}
