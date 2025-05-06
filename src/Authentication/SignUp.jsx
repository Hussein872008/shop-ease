import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { MdPerson, MdEmail, MdPhone, MdLocationOn, MdLock, MdError, MdCheckCircle } from 'react-icons/md';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, slideIn } from './motion';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    agree: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }

    // Clear firebase error when user changes input
    if (firebaseError) {
      setFirebaseError("");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid Gmail address";
        isValid = false;
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (!isPasswordStrong(formData.password)) {
      newErrors.password = "Password must contain at least 8 characters, one number and one special character";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    if (!formData.agree) {
      newErrors.agree = "You must agree to the terms";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const isPasswordStrong = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setFirebaseError("");

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      await updateProfile(auth.currentUser, {
        displayName: `${formData.firstName} ${formData.lastName}`,
      });

      setSuccessMessage("Account created successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      let errorMessage = "An error occurred during registration";

      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage = "Email is already in use";
          break;
        case "auth/weak-password":
          errorMessage = "Password is too weak";
          break;
        case "auth/invalid-email":
          errorMessage = "Invalid email address";
          break;
        default:
          errorMessage = error.message;
      }

      setFirebaseError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.h2 
          className="mt-6 text-center text-3xl font-extrabold text-gray-900"
          variants={fadeIn('down', 'spring', 0.2, 0.75)}
        >
          Create your account
        </motion.h2>
        <motion.p 
          className="mt-2 text-center text-sm text-gray-600"
          variants={fadeIn('down', 'spring', 0.4, 0.75)}
        >
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign In
          </Link>
        </motion.p>
      </div>

      <motion.div 
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <motion.div 
          className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"
          variants={slideIn('up', 'spring', 0.6, 0.75)}
        >
          {/* Success Message */}
          {successMessage && (
            <motion.div 
              className="mb-4 p-4 bg-green-50 rounded-md flex items-start"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <MdCheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <p className="text-sm text-green-700">{successMessage}</p>
            </motion.div>
          )}

          {/* Firebase Error Message */}
          {firebaseError && (
            <motion.div 
              className="mb-4 p-4 bg-red-50 rounded-md flex items-start"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <MdError className="h-5 w-5 text-red-500 mr-2 mt-0.5" />
              <p className="text-sm text-red-700">{firebaseError}</p>
            </motion.div>
          )}

          <motion.div className="grid grid-cols-2 gap-4 mb-6" variants={fadeIn('up', 'spring', 0.8, 0.75)}>
            <motion.button 
              type="button" 
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaGoogle className="w-5 h-5 mr-2 text-[#EF4444]" />
              Google
            </motion.button>

            <motion.button 
              type="button" 
              className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaFacebook className="w-5 h-5 mr-2 text-blue-600" />
              Facebook
            </motion.button>
          </motion.div>

          <motion.div className="relative mb-6" variants={fadeIn('up', 'spring', 1.0, 0.75)}>
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or register with email</span>
            </div>
          </motion.div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* First & Last Name */}
            <motion.div className="grid grid-cols-2 gap-4" variants={fadeIn('up', 'spring', 1.2, 0.75)}>
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdPerson className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`block w-full pl-10 border ${errors.firstName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                </div>
                {errors.firstName && (
                  <motion.p 
                    className="mt-1 text-sm text-red-600 flex items-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <MdError className="mr-1" /> {errors.firstName}
                  </motion.p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MdPerson className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`block w-full pl-10 border ${errors.lastName ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  />
                </div>
                {errors.lastName && (
                  <motion.p 
                    className="mt-1 text-sm text-red-600 flex items-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <MdError className="mr-1" /> {errors.lastName}
                  </motion.p>
                )}
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeIn('up', 'spring', 1.4, 0.75)}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdEmail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`block w-full pl-10 border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
              </div>
              {errors.email && (
                <motion.p 
                  className="mt-1 text-sm text-red-600 flex items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <MdError className="mr-1" /> {errors.email}
                </motion.p>
              )}
            </motion.div>

            {/* Phone */}
            <motion.div variants={fadeIn('up', 'spring', 1.6, 0.75)}>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number <span className="text-gray-500">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdPhone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full pl-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </motion.div>

            {/* Address */}
            <motion.div variants={fadeIn('up', 'spring', 1.8, 0.75)}>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address <span className="text-gray-500">(Optional)</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdLocationOn className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="block w-full pl-10 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={fadeIn('up', 'spring', 2.0, 0.75)}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-10 border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                <motion.div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? (
                    <MdVisibilityOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <MdVisibility className="h-5 w-5 text-gray-400" />
                  )}
                </motion.div>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Minimum 8 characters required
              </p>
              {errors.password && (
                <motion.p 
                  className="mt-1 text-sm text-red-600 flex items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <MdError className="mr-1" /> {errors.password}
                </motion.p>
              )}
            </motion.div>

            {/* Confirm Password */}
            <motion.div variants={fadeIn('up', 'spring', 2.2, 0.75)}>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MdLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-10 border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                />
                <motion.div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {showPassword ? (
                    <MdVisibilityOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <MdVisibility className="h-5 w-5 text-gray-400" />
                  )}
                </motion.div>
              </div>
              {errors.confirmPassword && (
                <motion.p 
                  className="mt-1 text-sm text-red-600 flex items-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <MdError className="mr-1" /> {errors.confirmPassword}
                </motion.p>
              )}
            </motion.div>

            {/* Agreement */}
            <motion.div className="flex items-start" variants={fadeIn('up', 'spring', 2.4, 0.75)}>
              <div className="flex items-center h-5">
                <input
                  id="agree"
                  name="agree"
                  type="checkbox"
                  checked={formData.agree}
                  onChange={handleChange}
                  className={`focus:ring-blue-500 h-4 w-4 text-blue-600 ${errors.agree ? 'border-red-300' : 'border-gray-300'} rounded`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="agree" className={`font-medium ${errors.agree ? 'text-red-600' : 'text-gray-700'}`}>
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500">Terms of Service</a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-500">Privacy Policy</a>
                </label>
                {errors.agree && (
                  <motion.p 
                    className="mt-1 text-sm text-red-600 flex items-center"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <MdError className="mr-1" /> {errors.agree}
                  </motion.p>
                )}
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div variants={fadeIn('up', 'spring', 2.6, 0.75)}>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#4b40c7] hover:bg-[#4338CA] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  'Create Account'
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SignUp;