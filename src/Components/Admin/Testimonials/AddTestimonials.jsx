import * as React from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from "react";
import { addDoc, collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../Firebase/firebaseConfig";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from '@mui/material';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTestimonials = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [fileUpload, setFileUpload] = useState({
        file: null,
        upload_preset: "testimonial_images"
    });
    const [previewImage, setPreviewImage] = useState("");
    const [formData, setFormData] = useState({
        name: "",
        occupation: "",
        image: null,
        feedback: ""
    });

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
                headers: { "Content-Type": "multipart/form-data" }
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

        try {
            let imageUrl = await uploadFile();
            if (!imageUrl) return;

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
        }
    };

    const getDataById = async (id) => {
        try {
            const res = await getDoc(doc(db, "testimonials", id));
            if (res.exists()) {
                setFormData(res.data());
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
        <Container id="testimonials" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
        }}>
            <Box component="form" onSubmit={handleFormSubmit} noValidate sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
            }}>
                <FormControl>
                    <FormLabel>Picture</FormLabel>
                    <input type='file' name='image' onChange={handleFileUpload} />
                </FormControl>
                {previewImage && <img style={{ width: "200px", borderRadius: "50%" }} src={previewImage} alt="preview" />}
                <FormControl>
                    <FormLabel>Name</FormLabel>
                    <TextField id="name" type='text' name="name" required fullWidth variant="outlined" value={formData.name} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                    <FormLabel>Occupation</FormLabel>
                    <TextField id="occupation" type='text' name="occupation" required fullWidth variant="outlined" value={formData.occupation} onChange={handleInputChange} />
                </FormControl>
                <FormControl>
                    <FormLabel>Feedback</FormLabel>
                    <TextField id="feedback" type='text' name="feedback" required fullWidth variant="outlined" value={formData.feedback} onChange={handleInputChange} />
                </FormControl>
                <Button type="submit" fullWidth variant="contained">Submit</Button>
                <ToastContainer />
            </Box>
        </Container>
    );
};

export default AddTestimonials;
