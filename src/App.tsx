import logo from "./logo.svg";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProductPage from "./pages/Product/ProductPage";
import Cart from "./components/Cart/Cart/Cart";
import Preview from "./components/Preview/Preview/Preview";
import { useAppSelector } from "./store/hooks";
import { store } from "./store/store";

function App() {
  const isLoggedIn = !!useAppSelector((store) => store.user.token);

  if (!isLoggedIn) {
    return (
      <>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </>
    );
  } else
    return (
      <>
        <Header />
        <Routes>
          <Route path='/product' element={<ProductPage />} />
          <Route path='/preview' element={<Preview />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/home' element={<Home />} />
          <Route path='*' element={<p>404 not found</p>} />
        </Routes>
        <Footer />
      </>
    );
}

export default App;
