import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input, Drawer, List, ListItem, ListItemText, Button } from '@mui/material';

function Test() {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('smartphones');
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  
  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories')
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
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

  const handleCategoryClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleSearchClick = () => {
    if (searchQuery.trim() === '') {
      // Show an alert or open a drawer with a message when searchQuery is empty
      // For example, you can use window.alert to show an alert:
      // window.alert('Please enter a search query');
      // Or open a drawer with a message:
      setSearchResults(['Please enter a search query']);
      setIsDrawerOpen(true);
      return; // Exit the function without further processing
    }

    // Filter the categories based on the search query
    const filteredCategories = categories.filter((category) =>
      category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Update the search results
    setSearchResults(filteredCategories);

    // Open the drawer if search results are not empty
    if (filteredCategories.length > 0) {
      setIsDrawerOpen(true);
    }
  };

  return (
    <>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button onClick={handleSearchClick} disabled={!searchQuery}>
            Search
          </button>
          <br />
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '1rem' }}>
        <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', padding: '1rem' }}>
          {searchResults.length > 0 ? (
            searchResults.map((category) => (
              <div key={category.id}>
                <h2
                  onClick={() => {
                    handleCategoryClick(category);
                  }}
                  style={{
                    marginBottom: '1rem',
                    width: '90%',
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
            ))
          ) : null}
        </ul>
      </div>
      <Drawer anchor="right" open={isDrawerOpen} onClose={closeDrawer}>
        <List>
          <ListItem>
            <ListItemText primary={`Search Results`} />
          </ListItem>
          {searchResults.map((result) => (
            <ListItem key={result.id}>
              <ListItemText primary={result} />
            </ListItem>
          ))}
          <ListItem>
            <Button variant="contained" onClick={closeDrawer}>
              Close Drawer
            </Button>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default Test;
