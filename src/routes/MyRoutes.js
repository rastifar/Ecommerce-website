import React from "react";
//React Router Dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
//Layouts
import AdminLayout from "../layouts/adminLayout/AdminLayout";
import UserLayout from "../layouts/userLayout/UserLayout";
//Pages
import {  
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
import RequiredAuth from "./components/RequiredAuth";

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
          path="/productgroup/:categoryNum"
          element={
            <UserLayout withSidebar={true}>
              <ProductGroups />
            </UserLayout>
          }
        />

        <Route
          path="/productgroup/:categoryNum/subcategory/:subcategoryNum"
          element={
            <UserLayout withSidebar={true}>
              <ProductGroups />
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
          path="/productgroup/:categoryNum/products/:productid"
          element={
            <UserLayout>
              <ProductDetails />
            </UserLayout>
          }
        />
        <Route
          path="/products/:productid"
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
          path="/login"
          element={
            <UserLayout>
              <AdminLogin />
            </UserLayout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <AdminLayout>
              <RequiredAuth>
                <AdminDashboard />
              </RequiredAuth>
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
