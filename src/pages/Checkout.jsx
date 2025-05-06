import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Box,
    Typography,
    TextField,
    Paper,
    Button,
    Divider,
    Grid,
    Alert,
    Snackbar,
    Avatar,
    Chip,
    Stepper,
    Step,
    StepLabel,
    Badge,
    IconButton
} from '@mui/material';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';

import {
    MdHome as HomeIcon,
    MdLocalShipping as ShippingIcon,
    MdPayment as PaymentIcon,
    MdCheckCircle as CheckCircleIcon,
    MdArrowBack as ArrowBackIcon
} from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../Redux/cartSlice';
import { useNavigate, Link } from 'react-router-dom';

const Checkout = () => {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        city: '',
        postalCode: '',
        email: '',
        phone: '',
        paymentMethod: 'credit-card'
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 50 ? 0 : 5.99;
    const tax = (subtotal * 0.1).toFixed(2);
    const total = (parseFloat(subtotal) + parseFloat(shipping) + parseFloat(tax)).toFixed(2);

    const steps = ['Shipping Information', 'Payment Method', 'Review Order'];

    const handleNext = () => {
        if (activeStep === 0 && !validateShipping()) return;
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateShipping = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone is required';
        } else if (!/^[0-9]{10,15}$/.test(formData.phone)) {
            newErrors.phone = 'Phone is invalid';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
            setIsSubmitting(false);
            setOpenSuccess(true);
            dispatch(clearCart());

            setTimeout(() => {
                navigate('/');
            }, 3000);
        }, 1500);
    };

    const handleCloseSnackbar = () => {
        setOpenSuccess(false);
    };

    const renderStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ShippingIcon color="primary" /> Shipping Information
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    error={!!errors.address}
                                    helperText={errors.address}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    error={!!errors.city}
                                    helperText={errors.city}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Postal Code"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    error={!!errors.postalCode}
                                    helperText={errors.postalCode}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    error={!!errors.phone}
                                    helperText={errors.phone}
                                    required
                                />
                            </Grid>
                        </Grid>
                    </Paper>
                );
            case 1:
                return (
                    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <PaymentIcon color="primary" /> Payment Method
                        </Typography>
                        <Box sx={{ mb: 2 }}>
                            <Button
                                fullWidth
                                variant={formData.paymentMethod === 'credit-card' ? 'contained' : 'outlined'}
                                onClick={() => handleChange({ target: { name: 'paymentMethod', value: 'credit-card' } })}
                                sx={{ mb: 1, justifyContent: 'flex-start', p: 2 }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Credit Card" width="24" />
                                    <Typography>Credit/Debit Card</Typography>
                                </Box>
                            </Button>
                            <Button
                                fullWidth
                                variant={formData.paymentMethod === 'paypal' ? 'contained' : 'outlined'}
                                onClick={() => handleChange({ target: { name: 'paymentMethod', value: 'paypal' } })}
                                sx={{ mb: 1, justifyContent: 'flex-start', p: 2 }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <img src="https://cdn-icons-png.flaticon.com/512/174/174861.png" alt="PayPal" width="24" />
                                    <Typography>PayPal</Typography>
                                </Box>
                            </Button>
                            <Button
                                fullWidth
                                variant={formData.paymentMethod === 'cash' ? 'contained' : 'outlined'}
                                onClick={() => handleChange({ target: { name: 'paymentMethod', value: 'cash' } })}
                                sx={{ justifyContent: 'flex-start', p: 2 }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <img src="https://cdn-icons-png.flaticon.com/512/2703/2703983.png" alt="Cash" width="24" />
                                    <Typography>Cash on Delivery</Typography>
                                </Box>
                            </Button>
                        </Box>
                    </Paper>
                );
            case 2:
                return (
                    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CheckCircleIcon color="primary" /> Review Your Order
                        </Typography>

                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Shipping Details</Typography>
                        <Box sx={{ mb: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                            <Typography>{formData.firstName} {formData.lastName}</Typography>
                            <Typography>{formData.address}</Typography>
                            <Typography>{formData.city}, {formData.postalCode}</Typography>
                            <Typography>Email: {formData.email}</Typography>
                            <Typography>Phone: {formData.phone}</Typography>
                        </Box>

                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Payment Method</Typography>
                        <Box sx={{ mb: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                            <Typography sx={{ textTransform: 'capitalize' }}>
                                {formData.paymentMethod.replace('-', ' ')}
                            </Typography>
                        </Box>

                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>Order Items</Typography>
                        <Box sx={{ mb: 2 }}>
                            {cart.map((item) => (
                                <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 2 }}>
                                    <Avatar
                                        src={item.image}
                                        alt={item.title}
                                        sx={{ width: 60, height: 60, borderRadius: 1 }}
                                        variant="rounded"
                                    />
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{item.title}</Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ${item.price} x {item.quantity}
                                        </Typography>
                                    </Box>
                                    <Typography sx={{ fontWeight: 'bold' }}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Paper>
                );
            default:
                return null;
        }
    };

    return (
        <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1200, mx: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <IconButton component={Link} to="/cart" sx={{ mr: 1 }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                    Checkout
                </Typography>
                <Chip
                    label={`${cart.length} ${cart.length === 1 ? 'item' : 'items'}`}
                    color="primary"
                    size="small"
                    sx={{ ml: 2 }}
                />
            </Box>

            <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            <form onSubmit={handleSubmit}>
                {renderStepContent(activeStep)}

                <Grid container spacing={3}>
                    <Grid item xs={12} md={7}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button
                                variant="outlined"
                                onClick={handleBack}
                                disabled={activeStep === 0}
                                startIcon={<ArrowBackIcon />}
                            >
                                Back
                            </Button>

                            {activeStep === steps.length - 1 ? (
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="success"
                                    disabled={isSubmitting || cart.length === 0}
                                    endIcon={<CheckCircleIcon />}
                                >
                                    {isSubmitting ? 'Placing Order...' : 'Place Order'}
                                </Button>
                            ) : (
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    disabled={cart.length === 0}
                                >
                                    Next
                                </Button>
                            )}
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                                <HomeIcon color="primary" /> Order Summary
                            </Typography>

                            <Box sx={{ mb: 2 }}>
                                {cart.slice(0, 3).map((item) => (
                                    <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', mb: 1, gap: 1 }}>
                                        <Avatar
                                            src={item.image}
                                            alt={item.title}
                                            sx={{ width: 40, height: 40, borderRadius: 1 }}
                                            variant="rounded"
                                        />
                                        <Typography variant="body2" sx={{ flex: 1 }} noWrap>
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                            x{item.quantity}
                                        </Typography>
                                    </Box>
                                ))}
                                {cart.length > 3 && (
                                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
                                        +{cart.length - 3} more items
                                    </Typography>
                                )}
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box sx={{ mb: 2 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography>Subtotal:</Typography>
                                    <Typography>${subtotal.toFixed(2)}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography>Shipping:</Typography>
                                    <Typography>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</Typography>
                                </Box>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                    <Typography>Tax (10%):</Typography>
                                    <Typography>${tax}</Typography>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Total:</Typography>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>${total}</Typography>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </form>

            <Dialog open={openSuccess} onClose={handleCloseSnackbar}>
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon color="success" />
                    Order Confirmed!
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body2">
                        Your order #{(Math.random() * 1000000).toFixed(0)} has been placed successfully.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSnackbar} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

        </Box>
    );
};

export default Checkout;