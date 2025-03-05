import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../Firebase/firebaseConfig";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewMenu = () => {
  const [cakes, setCakes] = useState([]);

  const getCakes = async () => {
    try {
      const res = await getDocs(collection(db, 'bakeryItem'));
      const cakes = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setCakes(cakes);
    } catch (error) {
      console.error("Error fetching cakes:", error);
      toast.error("Failed to fetch cakes. Please try again.");
    }
  };

  const handleDel = async (id) => {
    // Show a confirmation toast
    toast.info(
      <div>
        <p>Are you sure you want to delete this product?</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <Button
            variant="contained"
            size="small"
            sx={{ backgroundColor: '#d2ac47', color: '#fff', '&:hover': { backgroundColor: '#b8943c' } }}
            onClick={() => {
              toast.dismiss(); // Dismiss the toast
              confirmDelete(id); // Proceed with deletion
            }}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{ borderColor: '#d2ac47', color: '#d2ac47', '&:hover': { borderColor: '#b8943c', color: '#b8943c' } }}
            onClick={() => toast.dismiss()} // Dismiss the toast
          >
            No
          </Button>
        </div>
      </div>,
      {
        autoClose: false, // Don't auto-close the toast
        closeButton: false, // Hide the default close button
      }
    );
  };

  const confirmDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "bakeryItem", id));
      toast.success("Product deleted successfully!");
      getCakes();
    } catch (error) {
      console.error("Error deleting document:", error);
      toast.error("Failed to delete product. Please try again.");
    }
  };

  useEffect(() => {
    getCakes();
  }, []);

  return (
    <>
      <Box
        id="viewmenu"
        sx={{
          pt: { xs: 4, sm: 12 },
          pb: { xs: 8, sm: 16 },
          color: 'white',
          bgcolor: 'grey.900',
        }}
      >
        <Container
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 3, sm: 6 },
          }}
        >
          <Box
            sx={{
              width: { sm: '100%', md: '60%' },
              textAlign: { sm: 'left', md: 'center' },
            }}
          >
            <Typography variant="h4" gutterBottom align='center' sx={{ color: "#d2ac47" }}>
              Our Menu
            </Typography>
          </Box>
          <Link to="/admin/add-menu">
            <Button sx={{ borderColor: '#b8943c', color: "#b8943c", backgroundColor: "transparent" }} variant="outlined" size="large">
              Add an Item
            </Button>
          </Link>
          <Grid container spacing={4}>
            {cakes.map((item, index) => {
              const availabilityStatus = item.quantity == 0 ? "Sold Out" : "Available";
              return (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Stack
                    direction="column"
                    component={Card}
                    spacing={1}
                    useFlexGap
                    sx={{
                      color: 'inherit',
                      p: 2,
                      height: '100%',
                      borderColor: 'hsla(220, 25%, 25%, 0.3)',
                      backgroundColor: 'grey.800',
                    }}
                  >
                    <Box>
                      <img src={item.image} alt={item.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
                    </Box>
                    <div>
                      <Typography variant="h6" sx={{ color: '#d2ac47', textAlign: "center", mb: 1 }}>
                        {item.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="body2">Category:</Typography>
                        <Typography variant="body2" sx={{ color: 'grey.400' }}>{item.category}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="body2">Price:</Typography>
                        <Typography variant="body2" sx={{ color: 'grey.400' }}>{item.price}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="body2">Quantity:</Typography>
                        <Typography variant="body2" sx={{ color: 'grey.400' }}>{item.quantity}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="body2">Availability:</Typography>
                        <Typography variant="body2" sx={{ color: item.quantity == 0 ? 'red' : 'grey.400', fontWeight: item.quantity == 0 ? 'bold' : 'normal' }}>
                          {availabilityStatus}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Typography variant="body2">Baking Time:</Typography>
                        <Typography variant="body2" sx={{ color: 'grey.400' }}>{item.time} mins</Typography>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 1 }}>
                        Description:
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'grey.400', fontSize: '0.875rem', mb: 2 }}>
                        {item.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center", gap: 2 }}>
                        <Button sx={{ borderColor: '#b8943c', color: '#b8943c', backgroundColor: "transparent" }} variant="outlined" size="small">
                          <Link to={`/admin/add-menu/${item.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>Edit</Link>
                        </Button>
                        <Button sx={{ borderColor: '#b8943c', color: '#b8943c', backgroundColor: "transparent" }} variant="outlined" color="error" size="small" onClick={() => handleDel(item.id)}>
                          Delete
                        </Button>
                      </Box>
                    </div>
                  </Stack>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
      <ToastContainer
        position="top-center"
        autoClose={false}
        hideProgressBar={true}
        closeOnClick={false}
        pauseOnHover={true}
        draggable={false}
      />
    </>
  );
};

export default ViewMenu;