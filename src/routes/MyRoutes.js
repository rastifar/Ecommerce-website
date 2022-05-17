import React from "react";
//React Router Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Layouts
import AdminLayout from "../layouts/adminLayout/AdminLayout";
import UserLayout from "../layouts/userLayout/UserLayout";
//Pages
import {
  Aboutus,
  AdminDashboard,
  AdminLogin,
  CartPage,
  Checkout,
  Contacts,
  Goods,
  Home,
  StoreQuantity,
  PageNotFound,
  ProductDetails,
  ProductGroups,
  PurchaseFinalizing,
  PurchaseResult,
  Orders,
  NotFound,
} from "../pages";

const MyRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route
          path="/"
          element={
            <UserLayout>
              <Home />
            </UserLayout>
          }
        />
        <Route
          path="/productgroup/:id"
          element={
            <UserLayout>
              <ProductGroups />
            </UserLayout>
          }
        />
        <Route
          path="/aboutus"
          element={
            <UserLayout>
              <Aboutus />
            </UserLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <UserLayout>
              <CartPage />
            </UserLayout>
          }
        />
        <Route
          path="/contacts"
          element={
            <UserLayout>
              <Contacts />
            </UserLayout>
          }
        />
        <Route
          path="/productDetails"
          element={
            <UserLayout>
              <ProductDetails />
            </UserLayout>
          }
        />
        <Route
          path="/purchasefinalizing"
          element={
            <UserLayout>
              <PurchaseFinalizing />
            </UserLayout>
          }
        />
        <Route
          path="/purchaseresult"
          element={
            <UserLayout>
              <PurchaseResult />
            </UserLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <UserLayout>
              <Checkout />
            </UserLayout>
          }
        />
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        >
          <Route path="orders" element={<Orders />} />
          <Route path="goods" element={<Goods />} />
          <Route path="storequantity" element={<StoreQuantity />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default MyRoutes;
