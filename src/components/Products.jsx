import React, { useState, useEffect } from 'react';
import { useLoaderData, useSearchParams, useNavigate } from 'react-router-dom';
import { Rating, Button, Box, Typography, Chip, Snackbar, Alert } from '@mui/material';
import { FaCartPlus, FaCheck } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../Redux/cartSlice';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { addToWishlist, removeFromWishlist } from '../Redux/wishlistSlice';
import auth from '../FirebaseConfig';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { motion } from 'framer-motion';

const Products = () => {
  const data = useLoaderData();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';
  const [addedItems, setAddedItems] = useState({});
  const [showLoginAlert, setShowLoginAlert] = useState(false);
  const cart = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleAddToCart = (productId) => {
    if (!user) {
      setShowLoginAlert(true);
      return;
    }

    const product = filteredProducts.find(p => p.id === productId);
    if (product) {
      dispatch(addToCart(product));
      setAddedItems(prev => ({ ...prev, [productId]: true }));
      setTimeout(() => {
        setAddedItems(prev => ({ ...prev, [productId]: false }));
      }, 1000);
    }
  };
const handleRemoveFromCart = (productId) => {
  console.log('Removing product with ID:', productId);
  dispatch(removeFromCart(productId));
  console.log('Current cart after removal:', cart); 
};
  const handleWishlist = (productId) => {
    if (!user) {
      setShowLoginAlert(true);
      return;
    }
    const product = filteredProducts.find(p => p.id === productId);
    if (product) {
      const isInWishlist = wishlist.some(item => item.id === productId);
      if (isInWishlist) {
        dispatch(removeFromWishlist(productId));
      } else {
        dispatch(addToWishlist(product));
      }
    }
  };

  const filteredProducts = data?.data?.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  }) || [];

  if (filteredProducts.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6">
          {searchQuery ? `😔 No products found for "${searchQuery}"` : '😔 No products available'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box id="products-section" sx={{ p: 5, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>

      <Dialog
        open={showLoginAlert}
        onClose={() => setShowLoginAlert(false)}
        maxWidth="sm"
        fullWidth
      >
        <motion.div
          initial={{ opacity: 0, y: -50 }} 
          animate={{ opacity: 1, y: 0 }}    
          exit={{ opacity: 0, y: 50 }}     
          transition={{ duration: 0.5 }}  
        >
          <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            <span role="img" aria-label="warning">🚫</span> Sign In Required
          </DialogTitle>
          <DialogContent sx={{ textAlign: 'center', fontSize: '1rem', color: '#333' }}>
            You must <Link to="/login" style={{ color: '#4F46E5', textDecoration: 'underline' }}>sign in</Link> to add products to your cart or wishlist.
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'center' }}>
            <Button
              onClick={() => setShowLoginAlert(false)}
              color="primary"
              variant="outlined"
              sx={{ textTransform: 'none' }}
            >
              Close
            </Button>
          </DialogActions>
        </motion.div>
      </Dialog>

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: 2,
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {filteredProducts.map((product, index) => {
          const cartItem = cart.find(item => item.id === product.id);
          const isAdded = addedItems[product.id];

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Box sx={{
                p: 2,
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <Box sx={{
                  position: 'relative',
                  width: '100%',
                  height: '180px',
                  mb: 2
                }}>
                  <Box sx={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '6px',
                    overflow: 'hidden'
                  }}>
                    <img
                      src={product.image}
                      alt={product.title}
                      style={{
                        maxWidth: '100%',
                        maxHeight: '100%',
                        objectFit: 'contain',
                        mixBlendMode: 'multiply'
                      }}
                    />
                  </Box>
                </Box>

                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    minHeight: '48px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {product.title}
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{
                  mb: 2,
                  minHeight: '40px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  fontSize: '0.875rem'
                }}>
                  {product.description}
                </Typography>

                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 1
                }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating
                      value={product.rating.rate}
                      precision={0.1}
                      readOnly
                      size="small"
                      sx={{ color: '#ffb400' }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      ({product.rating.count})
                    </Typography>
                  </Box>
                  <Chip
                    label={product.category}
                    color="primary"
                    size="small"
                    sx={{
                      backgroundColor: '#4F46E5',
                      color: 'white',
                      fontWeight: 'bold',
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>

                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 'auto',
                  pt: 2
                }}>
                  <Typography variant="h6" sx={{
                    fontWeight: 'bold',
                    color: '#333'
                  }}>
                    ${product.price.toFixed(2)}
                  </Typography>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Link
                      to={`/product/${product.id}`}
                      style={{
                        color: '#1976d2',
                        fontWeight: 'bold',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        '&:hover': {
                          textDecoration: 'underline',
                        }
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      more details
                    </Link>
                    <Box sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      zIndex: 1
                    }}>
                      <IconButton
                        onClick={() => handleWishlist(product.id)}
                        sx={{
                          color: wishlist.some(item => item.id === product.id) ? '#ff4081' : 'rgba(0, 0, 0, 0.23)',
                          backgroundColor: 'rgba(255, 255, 255, 0.8)',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.9)'
                          }
                        }}
                      >
                        {wishlist.some(item => item.id === product.id) ? <FaHeart /> : <FaRegHeart />}
                      </IconButton>
                    </Box>
                    {isAdded ? (
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<FaCheck />}
                        disabled
                        sx={{
                          color: '#4caf50',
                          borderColor: '#4caf50',
                          backgroundColor: 'rgba(76, 175, 80, 0.1)',
                          fontWeight: 'bold',
                          minWidth: '110px',
                          textTransform: 'none',
                        }}
                      >
                        Added
                      </Button>
                    ) : cartItem ? (
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => handleRemoveFromCart(product.id)}
                        sx={{
                          minWidth: '110px',
                          fontWeight: 'bold',
                          textTransform: 'none',
                          '&:hover': {
                            backgroundColor: 'rgba(244, 67, 54, 0.1)',
                          },
                        }}
                      >
                        Remove ❌
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<FaCartPlus />}
                        onClick={() => handleAddToCart(product.id)}
                        sx={{
                          backgroundColor: '#1976d2',
                          fontWeight: 'bold',
                          minWidth: '110px',
                          textTransform: 'none',
                          '&:hover': {
                            backgroundColor: '#115293',
                          },
                        }}
                      >
                        Add to cart
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
};

export default Products;
