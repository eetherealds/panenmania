// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProfileProvider } from "./context/ProfileContext";

/** Auth */
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";

/** Before Login */
import HomePageBeforeLogin from "./pages/beforeLogin/HomePageBeforeLogin";
import ProductDetailBeforeLogin from "./pages/beforeLogin/ProductDetailBeforeLogin";
import CatalogBeforeLogin from "./pages/beforeLogin/CatalogBeforeLogin";
import AboutBeforeLogin from "./pages/beforeLogin/AboutBeforeLogin";
import ContactBeforeLogin from "./pages/beforeLogin/ContactBeforeLogin";

/** After Login - umum */
import HomePageAfterLogin from "./pages/afterLogin/HomePageAfterLogin";
import ProductDetailAfterLogin from "./pages/afterLogin/ProductDetailAfterLogin";
import CatalogAfterLogin from "./pages/afterLogin/CatalogAfterLogin";
import ContactAfterLogin from "./pages/afterLogin/ContactAfterLogin";
import AboutAfterLogin from "./pages/afterLogin/AboutAfterLogin";
import CartPage from "./pages/afterLogin/CartPage";
import Checkout from "./pages/afterLogin/Checkout";
import CheckoutSuccess from "./pages/afterLogin/CheckoutSuccess";
import NotificationPage from "./pages/afterLogin/NotificationPage";

/** Profile & Orders (FILE MASIH DI FOLDER `profile`) */
import ProfileMain from "./pages/profile/ProfileMain";
import ProfileAddress from "./pages/profile/ProfileAddress";
import ProfilePassword from "./pages/profile/ProfilePassword";
import OrderStatus from "./pages/profile/OrderStatus";
import OrderHistory from "./pages/profile/OrderHistory";
import OrderHistoryDetail from "./pages/profile/OrderHistoryDetail";

/** Admin */
import AdminLogin from "./admin/component/pages/AdminLogin";
import AdminTwoFA from "./admin/component/pages/AdminTwoFA";
import AdminDashboard from "./admin/component/pages/AdminDashboard";
import AdminProducts from "./admin/component/pages/AdminProducts";
import AdminOrders from "./admin/component/pages/AdminOrders";
import AdminUsers from "./admin/component/pages/AdminUsers";
import AdminADDProduct from "./admin/component/pages/AdminADDProduct";

const isLoggedIn = () => !!localStorage.getItem("token");

const Private = ({ children }) => {
  return isLoggedIn() ? children : <SignIn />;
};

function App() {
  return (
    <ProfileProvider>
      <div className="bg-[#FFFEF6] min-h-screen">
        {/* TIDAK ADA padding-top di sini */}
        <Routes>
        {/* Landing */}
        <Route
          path="/"
          element={
            isLoggedIn() ? <HomePageAfterLogin /> : <HomePageBeforeLogin />
          }
        />

        {/* Guest */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/catalog" element={<CatalogBeforeLogin />} />
        <Route path="/about" element={<AboutBeforeLogin />} />
        <Route path="/contact" element={<ContactBeforeLogin />} />
        <Route
          path="/product-before/:id"
          element={<ProductDetailBeforeLogin />}
        />

        {/* After Login - umum */}
        <Route
          path="/home"
          element={
            <Private>
              <HomePageAfterLogin />
            </Private>
          }
        />
        <Route
          path="/catalog/login"
          element={
            <Private>
              <CatalogAfterLogin />
            </Private>
          }
        />
        <Route
          path="/about/login"
          element={
            <Private>
              <AboutAfterLogin />
            </Private>
          }
        />
        <Route
          path="/contact/login"
          element={
            <Private>
              <ContactAfterLogin />
            </Private>
          }
        />
        <Route
          path="/product/:id"
          element={
            <Private>
              <ProductDetailAfterLogin />
            </Private>
          }
        />
        <Route
          path="/cart"
          element={
            <Private>
              <CartPage />
            </Private>
          }
        />
        <Route
          path="/checkout"
          element={
            <Private>
              <Checkout />
            </Private>
          }
        />
        <Route
          path="/checkout-success"
          element={
            <Private>
              <CheckoutSuccess />
            </Private>
          }
        />
        <Route
          path="/notifications"
          element={
            <Private>
              <NotificationPage />
            </Private>
          }
        />

        {/* Profile & Orders */}
        <Route
          path="/profile"
          element={
            <Private>
              <ProfileMain />
            </Private>
          }
        />
        <Route
          path="/profile/address"
          element={
            <Private>
              <ProfileAddress />
            </Private>
          }
        />
        <Route
          path="/profile/password"
          element={
            <Private>
              <ProfilePassword />
            </Private>
          }
        />
        <Route
          path="/orders-status"
          element={
            <Private>
              <OrderStatus />
            </Private>
          }
        />
        <Route
          path="/orders-history"
          element={
            <Private>
              <OrderHistory />
            </Private>
          }
        />
        <Route
          path="/orders-history/:orderId"
          element={
            <Private>
              <OrderHistoryDetail />
            </Private>
          }
        />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/2fa" element={<AdminTwoFA />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/add" element={<AdminADDProduct />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
      </div>
    </ProfileProvider>  );}

export default App;