import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'
import item1 from "../../../Assets/Images/Admin/customer favs/bounty cake.jpg"
import item2 from "../../../Assets/Images/Admin/customer favs/chocolate marble biscuits.jpg"
import item3 from "../../../Assets/Images/Admin/customer favs/nutella cake.jpg"
import item4 from "../../../Assets/Images/Admin/customer favs/nutella donuts.jpg"
import item5 from "../../../Assets/Images/Admin/customer favs/nutella sundae.jpg"
import item6 from "../../../Assets/Images/Admin/customer favs/toffee three milk cake.jpg"
import { Button } from '@mui/material';

  
  const logoStyle = {
    width: '150px',
    height: '120px',
    margin: '0 32px'
  };


const CustomerFav = () => {

    const custFav = [
        { img: item1, title: "Bounty Cake" },
        { img: item2, title: "Chocolate Marble Biscuits" },
        { img: item3, title: "Nutella Cake" },
        { img: item4, title: "Nutella Donuts" },
        { img: item5, title: "Nutella Sundae" },
        { img: item6, title: "Toffee Three Milk Cake" }
      ];

      
  return (
    <>
     <Box id="customerfavourites" sx={{ py: 4 ,justifyContent:"center",  pt: { xs: 4, sm: 12 },
          pb: { xs: 8, sm: 16 },
          color: 'white',
          bgcolor: 'grey.900',}}>
     <Typography
          component="h2"
          variant="h4"
          gutterBottom
          align='center'
          sx={{ color: "#d2ac47" }}
        >
        Customers favourites
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button sx={{ borderColor: '#b8943c',color:"#b8943c",backgroundColor:"transparent"}} variant="outlined" size="large">Add an item</Button>
        </Box>
   
      <Grid container spacing={2} sx={{ justifyContent: 'center', mt: 3 }}>
      
        {custFav.map((items, index) =>(
          <Grid item key={index}>
            <img
              src={items.img}
              alt={`Fake company number ${index + 1}`}
              style={logoStyle}
              
            />
               <Typography
        component="p"
        variant="p"
        align="center"
        sx={{ color:'#b8943c',mt:2 }}
      >
        {items.title}
      </Typography>
      <Box sx={{ display: 'flex',alignItems:"center", justifyContent:"center" ,gap:2,mt:2}}>
                  <Button sx={{ borderColor: '#b8943c', color: '#b8943c',backgroundColor:"transparent"}} variant="outlined" size="small">Edit</Button>
                  <Button variant="outlined" sx={{ borderColor: '#b8943c',color:"#b8943c",backgroundColor:"transparent"}} size="small">Del</Button>
                </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
      </>
  )
}

export default CustomerFav