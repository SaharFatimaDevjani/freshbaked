import * as React from 'react';
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../Firebase/firebaseConfig";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const getTestimonials = async () => {
    try {
      const res = await getDocs(collection(db, 'testimonials'));
      const testimonials = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTestimonials(testimonials);
    } catch {
      console.log("Error fetching testimonials");
      toast.error("Failed to fetch testimonials. Please try again.");
    }
  };

  const handleDel = async (id) => {
    // Show a confirmation toast
    toast.info(
      <div>
        <p>Are you sure you want to delete this testimonial?</p>
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
      await deleteDoc(doc(db, "testimonials", id));
      toast.success("Testimonial deleted successfully!");
      getTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast.error("Failed to delete testimonial. Please try again.");
    }
  };

  useEffect(() => {
    getTestimonials();
  }, []);

  return (
    <>
      <Container
        id="testimonials"
        sx={{
          pt: { xs: 4, sm: 12 },
          pb: { xs: 8, sm: 16 },
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
          <Typography component="h2" variant="h4" gutterBottom sx={{ color: "#d2ac47" }}>
            Testimonials
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            "See what our customers love about our baked delights! From the perfect crunch to the softest bites, we craft every treat with love and the finest ingredients. Join us for fresh flavors, sweet moments, and pure indulgence!"
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Link to="/admin/add-testimonials">
              <Button color="primary" variant="contained" size="large">Add a testimonial</Button>
            </Link>
          </Box>
        </Box>
        <Grid container spacing={2}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
              <Card
                variant="outlined"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flexGrow: 1,
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 3,
                }}
              >
                <CardContent>
                  <Typography variant="body1" gutterBottom sx={{ color: 'text.secondary' }}>
                    {testimonial.feedback}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: "center", p: 2 }}>
                  <CardHeader
                    avatar={<Avatar src={testimonial.image} alt={testimonial.name} />}
                    title={testimonial.name}
                    subheader={testimonial.occupation}
                    sx={{
                      "& .MuiCardHeader-title": {
                        fontSize: "1.2rem",
                        fontWeight: "bold",
                        color: "#d2ac47",
                      },
                      "& .MuiCardHeader-subheader": {
                        fontSize: "0.9rem",
                        color: "#333",
                      },
                    }}
                  />
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="contained" size="small">
                      <Link to={`/admin/add-testimonials/${testimonial.id}`} style={{ textDecoration: "none", color: "#fff" }}>Edit</Link>
                    </Button>
                    <Button variant="outlined" color="error" size="small" onClick={() => handleDel(testimonial.id)}>
                      Delete
                    </Button>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
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

export default Testimonials;