import { useRouteError } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      p: 3,
      textAlign: 'center'
    }}>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <Typography variant="h3" gutterBottom>
          Oops!
        </Typography>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Typography variant="h5" sx={{ mb: 2 }}>
          Sorry, an unexpected error has occurred.
        </Typography>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Typography variant="body1" color="error" sx={{ mb: 4 }}>
          {error.statusText || error.message || 'Unknown error'}
        </Typography>
      </motion.div>

      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          variant="contained" 
          component={Link} 
          to="/"
          size="large"
        >
          Go to Home
        </Button>
      </motion.div>
    </Box>
  );
};

export default ErrorPage;