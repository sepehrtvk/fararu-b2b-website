import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login/Login";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProductPage from "./pages/Product/ProductPage";
import Cart from "./components/Cart/Cart/Cart";
import Preview from "./components/Preview/Preview/Preview";
import { useAppSelector } from "./store/hooks";
import { store } from "./store/store";
import Signup from "./pages/Auth/Signup/Signup";
import Shop from "./pages/Shop/Shop/Shop";

function App() {
  const isLoggedIn = !!useAppSelector((store) => store.user.token);

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
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<Navigate to='/home' />} />
        </Routes>
        <Footer />
      </>
    );
}

export default App;
