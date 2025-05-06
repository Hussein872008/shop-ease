import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SignUp from './Authentication/SignUp';
import SignIn from './Authentication/SignIn';
import WishList from './pages/wishlist';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout'; // تأكد من استيراد مكون Checkout
import { ProductsData } from './api/Api';
import ProductDetails from './pages/ProductDetails';
import ErrorPage from './pages/ErrorPage';

const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} loader={ProductsData} />
        <Route path='cart' element={<Cart />} />
        <Route path='wishlist' element={<WishList />} />
        <Route path='checkout' element={<Checkout />} /> {/* أضف هذا المسار */}
        <Route 
          path='product/:productId' 
          element={<ProductDetails />} 
          loader={async ({ params }) => {
            try {
              const response = await fetch(`https://fakestoreapi.com/products/${params.productId}`);
              if (!response.ok) {
                throw new Error('Product not found');
              }
              const data = await response.json();
              return data;
            } catch (error) {
              throw new Error('Failed to fetch product details');
            }
          }}
          errorElement={<ErrorPage />}
        />
      </Route>
      
      <Route path='/register' element={<SignUp />} />
      <Route path='/login' element={<SignIn />} />
    </>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;