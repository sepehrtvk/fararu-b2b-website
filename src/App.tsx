import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login/Login";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProductPage from "./pages/Product/ProductPage";
import Cart from "./pages/Cart/Cart/Cart";
import Preview from "./pages/Preview/Preview/Preview";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { store } from "./store/store";
import Signup from "./pages/Auth/Signup/Signup";
import Shop from "./pages/Shop/Shop/Shop";
import Profile from "./pages/Options/Profile/Profile";
import Cardex from "./pages/Options/Cardex/Cardex";
import OrderHistory from "./pages/Options/OrderHistory/OrderHistory";
import { useEffect } from "react";
import { getPolGeneralConfig } from "./api/customer";
import { setGeneralConfig } from "./store/slices/config";
import notifyToast from "./components/toast/toast";
import OrderDetail from "./pages/Options/OrderHistory/OrderDetail";

function App() {
  const isLoggedIn = !!useAppSelector((store) => store.user.token);
  const { token } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token)
      getPolGeneralConfig().subscribe({
        next: (result) => {
          dispatch(setGeneralConfig(result));
        },
        error: (err: Error) => {
          notifyToast("error", { message: err.message });
        },
      });
  }, [token]);

  if (!isLoggedIn) {
    return (
      <>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </>
    );
  } else
    return (
      <>
        <Header />
        <Routes>
          <Route path='/shop' element={<Shop />} />
          <Route path='/product' element={<ProductPage />} />
          <Route path='/preview' element={<Preview />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/cardex' element={<Cardex />} />
          <Route path='/orderHistory' element={<OrderHistory />} />
          <Route
            path='/orderHistory/OrderDetail/:orderId'
            element={<OrderDetail />}
          />
          <Route path='/home' element={<Home />} />
          {/* <Route path='*' element={<Navigate to='/home' />} /> */}
        </Routes>
        <Footer />
      </>
    );
}

export default App;
