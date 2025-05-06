import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLoaderData, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../Redux/cartSlice';
import { Button, Box, Typography, Paper, Rating, Chip } from '@mui/material';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { addToWishlist, removeFromWishlist } from '../Redux/wishlistSlice';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductDetails = () => {
  const { productId } = useParams();
  const product = useLoaderData();
  const [isAdded, setIsAdded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const cartItem = cart.find(item => item.id === product?.id);
  const wishlist = useSelector((state) => state.wishlist);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    setIsInWishlist(wishlist.some(item => item.id === product?.id));
  }, [wishlist, product]);

  const handleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product));
    }
  };
  useEffect(() => {
    let timer;
    if (showSuccess) {
      timer = setTimeout(() => {
        setShowSuccess(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [showSuccess]);

  if (!product || !product.id) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="error" variant="h6">Product not found 😔</Typography>
      </Box>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart({
      ...product,
      quantity: 1
    }));
    setIsAdded(true);
    setShowSuccess(true);
  };

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product.id));
    setIsAdded(false);
  };

  return (
    <Box sx={{
      p: 4,
      maxWidth: 900,
      margin: '0 auto',
      minHeight: 'calc(100vh - 128px)',
    }}>
      <Paper elevation={6} sx={{
        p: 4,
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4,
        borderRadius: '8px'
      }}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            width: '100%',
            maxWidth: '400px',
            display: 'flex',
            justifyContent: 'center',
            marginBottom: { xs: '24px', md: 0 }
          }}
        >
          <motion.img
            src={product.image}
            alt={product.title}
            whileHover={{ scale: 1.05 }}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
              borderRadius: '8px',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ width: '100%' }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            {product.title}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Rating
              value={product.rating.rate}
              precision={0.1}
              readOnly
              size="small"
              sx={{ color: '#ffb400' }}
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({product.rating.count} reviews)
            </Typography>
          </Box>

          <Chip
            label={`${product.category}`}
            color="primary"
            size="small"
            sx={{
              backgroundColor: '#4F46E5',
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'capitalize',
              marginBottom: 2
            }}
          />

          <Typography variant="h5" sx={{ mb: 2, color: '#d32f2f', fontWeight: 'bold' }}>
            ${product.price.toFixed(2)}
          </Typography>

          <Typography variant="body1" paragraph sx={{ mb: 3 }}>
            {product.description}
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={isInWishlist ? <FaHeart /> : <FaRegHeart />}
            onClick={handleWishlist}
            sx={{
              mt: 2,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 'bold',
              minWidth: '200px',
              borderColor: isInWishlist ? '#ff4081' : '',
              color: isInWishlist ? '#ff4081' : ''
            }}
            fullWidth
          >
            {isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}
          </Button>
          {showSuccess ? (
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              <Button
                variant="contained"
                color="success"
                startIcon={<FaCheck />}
                disabled
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  minWidth: '200px',
                  backgroundColor: '#4caf50',
                }}
                fullWidth
              >
                Added
              </Button>
            </motion.div>
          ) : (isAdded || cartItem) ? (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<FaTrash />}
                onClick={handleRemoveFromCart}
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  minWidth: '200px'
                }}
                fullWidth
              >
                Remove from cart
              </Button>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddToCart}
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  minWidth: '200px'
                }}
                fullWidth
              >
                Add to cart
              </Button>
            </motion.div>
          )}
        </motion.div>
      </Paper>
    </Box>
  );
};

export default ProductDetails;
