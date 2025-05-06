import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Grid, 
  IconButton,
  Chip,
  Rating
} from '@mui/material';
import { FaHeart, FaTrash, FaShoppingCart } from 'react-icons/fa';
import { removeFromWishlist } from '../Redux/wishlistSlice';
import { addToCart } from '../Redux/cartSlice';
const Wishlist = () => {
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product.id));
  };

  if (wishlist.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" gutterBottom>
          Your wishlist is empty
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          component={Link} 
          to="/"
          sx={{ mt: 2 }}
        >
          Continue Shopping
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Your Wishlist ({wishlist.length})
      </Typography>
      
      <Grid container spacing={3}>
        {wishlist.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Paper sx={{ p: 2, height: '100%', position: 'relative' }}>
              <IconButton
                onClick={() => handleRemove(product.id)}
                sx={{ 
                  position: 'absolute', 
                  top: 8, 
                  right: 8,
                  color: '#ff4081'
                }}
              >
                <FaHeart />
              </IconButton>
              
              <Box sx={{ 
                height: '180px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                mb: 2
              }}>
                <img
                  src={product.image}
                  alt={product.title}
                  style={{ 
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain'
                  }}
                />
              </Box>
              
              <Typography variant="h6" gutterBottom>
                {product.title}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Rating value={product.rating.rate} precision={0.1} readOnly size="small" />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  ({product.rating.count})
                </Typography>
              </Box>
              
              <Chip 
                label={product.category} 
                size="small" 
                sx={{ 
                  mb: 2,
                  backgroundColor: '#4F46E5',
                  color: 'white'
                }} 
              />
              
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                ${product.price.toFixed(2)}
              </Typography>
              
              <Button
                variant="contained"
                fullWidth
                startIcon={<FaShoppingCart />}
                onClick={() => handleAddToCart(product)}
                sx={{
                  backgroundColor: '#4F46E5',
                  '&:hover': {
                    backgroundColor: '#4338CA'
                  }
                }}
              >
                Add to Cart
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Wishlist;