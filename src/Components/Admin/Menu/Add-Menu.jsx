import * as React from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from "react";
import { addDoc, collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase/firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormControl, FormLabel, TextField, Typography, Stack, Divider, MenuItem, Select, InputLabel } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
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

const AddMenuContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#1a1a1a', // Changed to match CustomerFav background
}));

const AddMenuButton = styled(Button)({
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

const ViewMenuButton = styled(Button)({
  backgroundColor: '#d2ac47 !important', // Golden background
  color: 'white !important',
  fontWeight: '600',
  fontSize: '16px',
  padding: '12px',
  borderRadius: '8px',
  transition: '0.3s',
  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
  border: '2px solid #d2ac47 !important', // Golden border
  '&:hover': {
    backgroundColor: '#fff !important', // White background on hover
    color: '#d2ac47 !important', // Golden text on hover
  },
});

// Custom focus styles for TextField and Select
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

const AddMenu = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [fileUpload, setFileUpload] = useState({
    file: null,
    upload_preset: "menu_image",
  });

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: null,
    price: null,
    quantity: null,
    time: "",
    description: "",
    availability: "Available",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setFileUpload({
        ...fileUpload,
        file: file,
      });
    } else {
      toast.error("Please upload a valid image file (JPG, PNG, etc.).");
    }
  };

  const API_URL = import.meta.env.VITE_CLOUDINARY_API_URL;

  const uploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append("file", fileUpload.file);
      formData.append("upload_preset", fileUpload.upload_preset);

      const res = await axios.post(API_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      toast.error("Failed to upload image. Please try again.");
      throw error;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.category ||
      !formData.time ||
      !formData.description ||
      !formData.price ||
      !formData.quantity ||
      !fileUpload.file
    ) {
      toast.error("Please fill all fields");
      return;
    }

    if (formData.price < 0 || formData.quantity < 0) {
      toast.error("Price and quantity must be greater than or equal to 0.");
      return;
    }

    try {
      let image_url = formData.image;

      if (fileUpload.file) {
        const res = await uploadFile();
        image_url = res.data.secure_url;
        setFormData({ ...formData, image: image_url });
      }

      const updatedFormData = {
        title: formData.title || "",
        category: formData.category || "",
        price: formData.price || 0,
        quantity: formData.quantity || 0,
        time: formData.time || "",
        description: formData.description || "",
        availability: formData.availability || "Available",
        image: image_url || "",
      };

      if (params.id) {
        const docRef = doc(db, "bakeryItem", params.id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          await updateDoc(docRef, updatedFormData);
          toast.success("Product updated successfully!");
        } else {
          toast.error("Document does not exist.");
        }
      } else {
        await addDoc(collection(db, "bakeryItem"), updatedFormData);
        toast.success("Product added successfully!");
      }

      setFormData({
        title: "",
        category: "",
        image: null,
        price: null,
        quantity: null,
        time: "",
        description: "",
        availability: "Available",
      });
      setFileUpload({
        file: null,
        upload_preset: "menu_image",
      });
      document.getElementById("file-upload").value = "";

      navigate("/admin/");
    } catch (error) {
      console.error("Error adding/updating document:", error);
      toast.error("Failed to add/update product. Please try again.");
    }
  };

  const getDataById = async (id) => {
    try {
      const res = await getDoc(doc(db, "bakeryItem", id));
      const bakeryItem = { ...res.data() };
      setFormData(bakeryItem);
    } catch {
      console.log("Error");
    }
  };

  useEffect(() => {
    if (params.id) {
      getDataById(params.id);
    }
  }, [params.id]);

  return (
    <>
      <style>{globalStyles}</style>
      <AddMenuContainer>
        <Card>
          <Typography variant="h4" sx={{ fontSize: '24px', fontWeight: '600', textAlign: 'center', my: 2, color: '#d2ac47' }}>
            Manage Products
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, color: '#666' }}>
            Use this form to add or update product details. Fill in all fields to manage your menu items.
          </Typography>
          <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth sx={customFocusStyles}>
                <TextField
                  label="Product Name"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <FormControl fullWidth sx={customFocusStyles}>
                <TextField
                  label="Price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth sx={customFocusStyles}>
                <InputLabel shrink>Category</InputLabel>
                <Select
                  label="Category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Biscuits & Cookies">Biscuits & Cookies</MenuItem>
                  <MenuItem value="Brownies & Cupcakes">Brownies & Cupcakes</MenuItem>
                  <MenuItem value="Cakes">Cakes</MenuItem>
                  <MenuItem value="Sandwiches & Donuts">Sandwiches & Donuts</MenuItem>
                  <MenuItem value="Sundae & Valuepacks">Sundae & Valuepacks</MenuItem>
                  <MenuItem value="Sweets & Salts">Sweets & Salts</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={customFocusStyles}>
                <InputLabel shrink>Availability</InputLabel>
                <Select
                  label="Availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                >
                  <MenuItem value="Available">Available</MenuItem>
                  <MenuItem value="Not Available">Not Available</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth sx={customFocusStyles}>
                <TextField
                  label="Stock"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <FormControl fullWidth sx={customFocusStyles}>
                <TextField
                  label="Baking Time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
            </Box>

            <FormControl fullWidth sx={customFocusStyles}>
              <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Choose an Image</FormLabel>
              <Box sx={{ border: '1px dashed #d2ac47', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="file-upload" 
                />
                <label htmlFor="file-upload">
                  <Button variant="outlined" component="span" >
                    Choose File
                  </Button>
                </label>
                {fileUpload.file ? (
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Selected: {fileUpload.file.name}
                  </Typography>
                ) : (
                  <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
                    No file selected
                  </Typography>
                )}
              </Box>
            </FormControl>

            <AddMenuButton type="submit" fullWidth>
              Submit
            </AddMenuButton>

            <ViewMenuButton
              fullWidth
              onClick={() => navigate("/admin/view-menu")}
            >
              View Products
            </ViewMenuButton>
          </Box>
          <ToastContainer />
        </Card>
      </AddMenuContainer>
    </>
  );
};

export default AddMenu;