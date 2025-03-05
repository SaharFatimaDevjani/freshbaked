import * as React from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from "react";
import { addDoc, collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase/firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormControl, FormLabel, TextField, Typography, Stack } from '@mui/material';
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

const AddTestimonialsContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#1a1a1a', // Dark background
}));

const SubmitButton = styled(Button)({
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

// Custom focus styles for TextField
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

const AddTestimonials = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [fileUpload, setFileUpload] = useState({
    file: null,
    upload_preset: "testimonial_images",
  });
  const [previewImage, setPreviewImage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    occupation: "",
    image: null,
    feedback: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // New state variable

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileUpload({ ...fileUpload, file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const API_URL = import.meta.env.VITE_CLOUDINARY_API_URL;

  const uploadFile = async () => {
    if (!fileUpload.file) return null;

    const formData = new FormData();
    formData.append("file", fileUpload.file);
    formData.append("upload_preset", fileUpload.upload_preset);

    try {
      const res = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.secure_url;
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Image upload failed!");
      return null;
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.occupation || !formData.feedback) {
      toast.error("Please fill all fields!");
      return;
    }

    setIsSubmitting(true); // Disable the button and change text

    try {
      let imageUrl = formData.image; // Use existing image URL by default
      if (fileUpload.file) {
        imageUrl = await uploadFile();
        if (!imageUrl) return;
      }

      const updatedFormData = { ...formData, image: imageUrl };

      if (params.id) {
        await updateDoc(doc(db, "testimonials", params.id), updatedFormData);
        toast.success("Testimonial updated successfully!");
      } else {
        await addDoc(collection(db, "testimonials"), updatedFormData);
        toast.success("Testimonial added successfully!");
      }

      // Reset form fields
      setFormData({ name: "", occupation: "", image: null, feedback: "" });
      setFileUpload({ file: null, upload_preset: "testimonial_images" });
      setPreviewImage("");
    } catch (error) {
      console.error("Error adding testimonial:", error);
      toast.error("Failed to add testimonial!");
    } finally {
      setIsSubmitting(false); // Re-enable the button
    }
  };

  const getDataById = async (id) => {
    try {
      const res = await getDoc(doc(db, "testimonials", id));
      if (res.exists()) {
        const data = res.data();
        setFormData(data);
        setPreviewImage(data.image); // Set the preview image from the database
      }
    } catch (error) {
      console.error("Error fetching data", error);
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
      <AddTestimonialsContainer id="testimonials">
        <Card>
          <Typography variant="h4" sx={{ fontSize: '24px', fontWeight: '600', textAlign: 'center', my: 2, color: '#d2ac47' }}>
            Manage Testimonials
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center', mb: 4, color: '#666' }}>
            Use this form to add or update testimonials. Fill in all fields to manage testimonials.
          </Typography>
          <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}>
            <FormControl>
              <FormLabel>Picture</FormLabel>
              <Box sx={{ border: '1px dashed #d2ac47', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>
                <input
                  type="file"
                  name="image"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="file-upload"
                />
                <label htmlFor="file-upload">
                  <Button variant="outlined" component="span">
                    Choose File
                  </Button>
                </label>
                {previewImage && (
                  <img
                    src={previewImage}
                    alt="preview"
                    style={{ width: "200px", borderRadius: "50%", marginTop: '10px' }}
                  />
                )}
              </Box>
            </FormControl>
            <FormControl fullWidth sx={customFocusStyles}>
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={customFocusStyles}>
              <TextField
                label="Occupation"
                name="occupation"
                value={formData.occupation}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={customFocusStyles}>
              <TextField
                label="Feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </FormControl>
            <SubmitButton type="submit" fullWidth disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </SubmitButton>
          </Box>
          <ToastContainer />
        </Card>
      </AddTestimonialsContainer>
    </>
  );
};

export default AddTestimonials;