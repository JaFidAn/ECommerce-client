import React, { useEffect, useState } from "react";
import { Footer, Header } from "../Components/Layout";
import {
  AccessDenied,
  AllOrders,
  AuthenticationTest,
  AuthenticationTestAdmin,
  Home,
  Login,
  MenuItemDetails,
  MenuItemList,
  MenuItemUpsert,
  MyOrders,
  NotFound,
  OrderConfirmed,
  OrderDetails,
  Payment,
  Register,
  ShoppingCart,
} from "../Pages";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetShoppingCartQuery } from "../Apis/shoppingCartApi";
import { setShoppingCart } from "../Store/Redux/shoppingCartSlice";
import jwt_decode from "jwt-decode";
import { user } from "../Types";
import { setLoggedInUser } from "../Store/Redux/userAuthSlice";
import { RootState } from "../Store/Redux/store";

function App() {
  const dispatch = useDispatch();
  const userData: user = useSelector((state: RootState) => state.userAuthStore);
  const { data, isLoading } = useGetShoppingCartQuery(userData.id);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { id, fullName, email, role }: user = jwt_decode(localToken);
      dispatch(setLoggedInUser({ id, fullName, email, role }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data, dispatch, isLoading]);

  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/menuItemDetails/:menuItemId"
            element={<MenuItemDetails />}
          />
          <Route path="/shoppingCart" element={<ShoppingCart />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/authentication" element={<AuthenticationTest />} />
          <Route path="/authorization" element={<AuthenticationTestAdmin />} />
          <Route path="/accessDenied" element={<AccessDenied />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order/myOrders" element={<MyOrders />} />
          <Route path="/order/allOrders" element={<AllOrders />} />
          <Route path="/menuItem/menuItemList" element={<MenuItemList />} />
          <Route
            path="/menuItem/menuItemUpsert/:id"
            element={<MenuItemUpsert />}
          />
          <Route path="/menuItem/menuItemUpsert" element={<MenuItemUpsert />} />
          <Route
            path="/order/orderConfirmed/:id"
            element={<OrderConfirmed />}
          />
          <Route path="/order/orderDetails/:id" element={<OrderDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
