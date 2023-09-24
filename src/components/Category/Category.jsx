import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Drawer, List, ListItem, ListItemText, Button } from '@mui/material';
function Category() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('smartphones');
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [isSearchDrawerOpen, setIsSearchDrawerOpen] = useState(false);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/category/${selectedCategory}`)
      .then((response) => {
        setCategoryProducts(response.data.products);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, [selectedCategory]);

  const fetchCategories = () => {
    axios.get('https://dummyjson.com/products/categories')
      .then((response) => {
        setCategories(response.data);
      })

      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };
  const handleSearchClick = () => {
    // Filter the categories based on the search query
    const filteredCategories = categories.filter((category) =>
      category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filteredCategories.length === "") {
      setCategories([]);
      alert("skjdjs")
    } else {
      // window.alert('No categories were found for your search.');
      setCategories(filteredCategories);
      setSearchPerformed(true);
    }
  };


  return (
    <>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              if (e.target.value == '') {
                setSearchQuery(e.target.value);
                fetchCategories();
              } else {
                setSearchQuery(e.target.value)
              }
            }}
          />
          <button onClick={handleSearchClick} disabled={!searchQuery}>
            Search
          </button>
          <br />
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '1rem' }}>
        {
          categories?.length == 0 ?
            <div 
            className='alert alert-danger'
            style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem' ,padding: '2rem', width: '100%' }}>
              <h6> No Category Found </h6>
            </div> :
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '1rem' }}>
              <>
                {categories.map((category) => (
                  <div key={category.id}>
                    <h2
                      onClick={() => {
                        handleCategoryClick(category);
                      }}
                      style={{
                        marginBottom: '1rem',
                        width: '100%',
                        padding: '1rem',
                        border: '1px solid gray',
                        borderRadius: '10px',
                        cursor: 'pointer',
                      }}

                    >
                      <a
                        style={{ textDecoration: 'none', color: 'inherit' }}
                        href={`#${category.id}`}
                      >
                        {category}
                      </a>
                    </h2>
                  </div>
                ))}
              </>
            </ul>
        }
      </div>
      <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
        <List>
          <ListItem>
            <ListItemText primary={`Products in Category: ${selectedCategory}`} />
          </ListItem>
          {categoryProducts.map((product) => (
            <ListItem key={product.id}>
              <ListItemText
                primary={`Title: ${product.title}`}
                secondary={`Description: ${product.description}`}
              />
            </ListItem>
          ))}
          <ListItem>
            <Button variant="contained" onClick={toggleDrawer}>
              Close Drawer
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Category;
