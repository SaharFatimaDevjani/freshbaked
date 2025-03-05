import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../Firebase/firebaseConfig";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const CustomerFav = () => {
  const [custFav, setCustFav] = useState([]);

  const fetchCustomerFav = async () => {
    const querySnapshot = await getDocs(collection(db, "customerFav"));
    const favorites = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCustFav(favorites);
  };

  const handleDelete = async (id) => {
    // Show a confirmation toast
    toast.info(
      <div>
        <p>Are you sure you want to delete this item?</p>
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
      await deleteDoc(doc(db, "customerFav", id));
      toast.success("Product removed from favorites successfully!");
      fetchCustomerFav();
    } catch (error) {
      console.error("Error removing document: ", error);
      toast.error("Failed to remove product from favorites. Please try again.");
    }
  };

  useEffect(() => {
    fetchCustomerFav();
  }, []);

  return (
    <Box id="customerfavourites" sx={{ py: 4, justifyContent: "center", color: 'white', bgcolor: 'grey.900' }}>
      <Typography variant="h4" gutterBottom align='center' sx={{ color: "#d2ac47" }}>
        Customers Favourites
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Link to="/admin/add-customerfav" style={{ textDecoration: 'none' }}>
          <Button sx={{ borderColor: '#b8943c', color: "#b8943c", backgroundColor: "transparent" }} variant="outlined" size="large">
            Add an item
          </Button>
        </Link>
      </Box>
      <Grid container spacing={2} sx={{ justifyContent: 'center', mt: 3 }}>
        {custFav.map((item) => (
          <Grid item key={item.id}>
            <img
              src={item.image}
              alt={item.title}
              style={{ width: '150px', height: '120px', margin: '0 32px' }}
            />
            <Typography variant="p" align="center" sx={{ color: '#b8943c', mt: 2 }}>
              {item.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center", gap: 2, mt: 2 }}>
              <Button
                sx={{ borderColor: '#b8943c', color: '#b8943c', backgroundColor: "transparent" }}
                variant="outlined"
                size="small"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
      <ToastContainer
        position="top-center"
        autoClose={false}
        hideProgressBar={true}
        closeOnClick={false}
        pauseOnHover={true}
        draggable={false}
      />
    </Box>
  );
};

export default CustomerFav;