import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../Firebase/firebaseConfig';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Hero() {
  const [user] = useAuthState(auth);

  const capitalizeName = (name) => {
    return name
      .split(' ') // Split words by spaces
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
      .join(' '); // Join them back
  };

  const getDisplayName = (user) => {
    if (user?.displayName) {
      return capitalizeName(user.displayName); // Ensure capitalization
    } else if (user?.email) {
      return capitalizeName(user.email.split('@')[0]); // Capitalize email username if no name
    }
    return 'Guest';
  };

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        }),
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              fontSize: 'clamp(3rem, 10vw, 3.5rem)',
            }}
          >
            Welcome&nbsp;
            <Typography
              component="span"
              variant="h1"
              sx={(theme) => ({
                fontSize: 'inherit',
                color: "#d2ac47",
                ...theme.applyStyles('dark', {
                  color: 'primary.light',
                }),
              })}
            >
              {getDisplayName(user)}
            </Typography>
          </Typography>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              width: { sm: '100%', md: '80%' },
            }}
          >
            "Manage your bakery operations effortlessly. Track orders, update your menu, monitor sales, and keep your business running smoothly—all in one place!"
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
