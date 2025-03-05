import * as React from 'react';
import { useState, useEffect } from 'react';
import { Box, Button, FormControl, InputLabel, Select, MenuItem, Typography, Stack } from '@mui/material';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from "../../../Firebase/firebaseConfig";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

// Global CSS to remove the default browser focus outline
const globalStyles = `
  *:focus {
    outline: none !important;
  }
`;

const Card = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  maxWidth: '800px',
  boxShadow: '0px 5px 15px rgba(0,0,0,0.1)',
  borderRadius: '12px',
  backgroundColor: '#fff',
}));

const AddFavContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#1a1a1a', // Dark background
}));

const AddFavButton = styled(Button)({
  backgroundColor: '#000 !important', // Black background
  color: '#d2ac47 !important', // Golden text
  border: '2px solid #d2ac47 !important', // Golden border
  fontWeight: '600',
  fontSize: '16px',
  padding: '12px',
  borderRadius: '8px',
  transition: '0.3s',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: '#fff !important', // White background on hover
    color: '#d2ac47 !important', // Golden text on hover
  },
});

const BackButton = styled(Button)({
  backgroundColor: 'transparent !important',
  color: '#b8943c !important', // Golden text
  border: '2px solid #b8943c !important', // Golden border
  fontWeight: '600',
  fontSize: '16px',
  padding: '12px',
  borderRadius: '8px',
  transition: '0.3s',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    backgroundColor: '#fff !important', // White background on hover
    color: '#b8943c !important', // Golden text on hover
  },
});

// Custom focus styles for Select
const customFocusStyles = {
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#d2ac47',
    transform: 'translate(14px, -20px) scale(0.75)', // Adjusted to bring label higher
  },
  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: '#d2ac47',
  },
  '& .Mui-focused': {
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#d2ac47 !important',
    },
  },
  '& .MuiInputBase-root': {
    '&:focus': {
      outline: 'none',
    },
  },
  '& .Mui-focused .MuiOutlinedInput-input': {
    outline: '2px solid #d2ac47',
    outlineOffset: '2px',
  },
};

const AddFav = () => {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "bakeryItem"));
      const uniqueCategories = [...new Set(querySnapshot.docs.map(doc => doc.data().category))];
      setCategories(uniqueCategories);
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = async (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    setSelectedProduct('');

    const querySnapshot = await getDocs(collection(db, "bakeryItem"));
    const filteredProducts = querySnapshot.docs
      .filter(doc => doc.data().category === category)
      .map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(filteredProducts);
  };

  const handleProductChange = (event) => {
    setSelectedProduct(event.target.value);
  };

  const handleAddFav = async () => {
    if (!selectedProduct) {
      toast.error("Please select a product"); // Error toast
      return;
    }

    const productToAdd = products.find(product => product.id === selectedProduct);

    try {
      await addDoc(collection(db, "customerFav"), {
        title: productToAdd.title,
        image: productToAdd.image
      });
      toast.success("Product added to favorites successfully!"); // Success toast
      setSelectedCategory('');
      setSelectedProduct('');
      setProducts([]);
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to add product to favorites. Please try again."); // Error toast
    }
  };

  return (
    <>
      <style>{globalStyles}</style>
      <AddFavContainer id="addfav">
        <Card>
          <Typography variant="h4" sx={{ fontSize: '24px', fontWeight: '600', textAlign: 'center', my: 2, color: '#d2ac47' }}>
            Add Customer Favorites
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
            {/* Back Button */}
            <BackButton
              variant="outlined"
              onClick={() => navigate('/admin/#customerfavourites')} // Navigate back
            >
              Back
            </BackButton>

            {/* Category Select */}
            <FormControl sx={{ minWidth: 200, ...customFocusStyles }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                label="Category"
              >
                {categories.map((category, index) => (
                  <MenuItem key={index} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Product Select */}
            <FormControl sx={{ minWidth: 200, ...customFocusStyles }}>
              <InputLabel>Product</InputLabel>
              <Select
                value={selectedProduct}
                onChange={handleProductChange}
                label="Product"
                disabled={!selectedCategory}
              >
                {products.map((product) => (
                  <MenuItem key={product.id} value={product.id}>{product.title}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Add to Favorites Button */}
            <AddFavButton
              variant="outlined"
              onClick={handleAddFav}
            >
              Add to Favorites
            </AddFavButton>
          </Box>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Card>
      </AddFavContainer>
    </>
  );
};

export default AddFav;