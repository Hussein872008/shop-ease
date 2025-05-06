import React from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton,
  Divider,
  Paper,
  Chip
} from '@mui/material';
import { 
  FaTrash as DeleteIcon,
  FaPlus as AddIcon,
  FaMinus as RemoveIcon,
  FaShoppingCart as ShoppingCartIcon
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  removeFromCart, 
  increaseQuantity, 
  decreaseQuantity, 
  clearCart 
} from '../Redux/cartSlice';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = (subtotal + shipping).toFixed(2);

  return (
    <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1200, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h4" sx={{ 
          mb: 3, 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          fontWeight: 'bold'
        }}>
          <ShoppingCartIcon size={24} />
          Your Shopping Cart
          <Chip 
            label={`${cart.length} ${cart.length === 1 ? 'item' : 'items'}`} 
            color="primary" 
            size="small"
            sx={{ ml: 1 }}
          />
        </Typography>
      </motion.div>
      
      {cart.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Your cart is empty</Typography>
            <Button 
              variant="contained" 
              color="primary"
              component={Link}
              to="/"
              sx={{ mt: 2 }}
            >
              Continue Shopping
            </Button>
          </Paper>
        </motion.div>
      ) : (
        <Box>
          <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
            {cart.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { sm: 'center' },
                  justifyContent: 'space-between',
                  mb: 2,
                  p: 2,
                  gap: 2,
                  position: 'relative'
                }}>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2, 
                    flex: 1,
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: { xs: 'flex-start', sm: 'center' }
                  }}>
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        style={{ 
                          width: 100, 
                          height: 100, 
                          objectFit: 'contain',
                          borderRadius: '4px',
                          backgroundColor: '#f5f5f5'
                        }} 
                      />
                    </motion.div>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 2,
                    justifyContent: { xs: 'space-between', sm: 'flex-end' },
                    width: { xs: '100%', sm: 'auto' }
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 1,
                      border: '1px solid #ddd',
                      borderRadius: '4px',
                      p: '4px 8px'
                    }}>
                      <motion.div whileTap={{ scale: 0.9 }}>
                        <IconButton 
                          size="small"
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          disabled={item.quantity <= 1}
                          sx={{ p: 0 }}
                        >
                          <RemoveIcon size={14} />
                        </IconButton>
                      </motion.div>
                      <Typography sx={{ minWidth: 30, textAlign: 'center' }}>
                        {item.quantity}
                      </Typography>
                      <motion.div whileTap={{ scale: 0.9 }}>
                        <IconButton 
                          size="small"
                          onClick={() => dispatch(increaseQuantity(item.id))}
                          sx={{ p: 0 }}
                        >
                          <AddIcon size={14} />
                        </IconButton>
                      </motion.div>
                    </Box>

                    <Typography sx={{ 
                      minWidth: 80, 
                      textAlign: 'right',
                      fontWeight: 'bold',
                      fontSize: '1rem'
                    }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>

                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <IconButton 
                        color="error"
                        onClick={() => dispatch(removeFromCart(item.id))}
                        sx={{ ml: 1 }}
                      >
                        <DeleteIcon size={18} />
                      </IconButton>
                    </motion.div>
                  </Box>
                </Box>
                {index < cart.length - 1 && <Divider />}
              </motion.div>
            ))}
          </Paper>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Order Summary
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Subtotal:</Typography>
                  <Typography>${subtotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>Shipping:</Typography>
                  <Typography>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    {subtotal < 50 && (
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                        (Free shipping on orders over $50)
                      </Typography>
                    )}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Total:</Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>${total}</Typography>
                </Box>
              </Box>
              
              <Box sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                gap: 2,
                pt: 2
              }}>
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    component={Link}
                    to="/"
                    sx={{ flex: 1 }}
                  >
                    Continue Shopping
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="contained" 
                    color="error"
                    onClick={() => dispatch(clearCart())}
                    startIcon={<DeleteIcon size={16} />}
                    sx={{ flex: 1 }}
                  >
                    Clear Cart
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    variant="contained" 
                    color="success"
                    size="large"
                    sx={{ flex: 1, fontWeight: 'bold' }}
                    component={Link}
                    to="/checkout"
                  >
                    Proceed to Checkout
                  </Button>
                </motion.div>
              </Box>
            </Paper>
          </motion.div>
        </Box>
      )}
    </Box>
  );
};

export default Cart;