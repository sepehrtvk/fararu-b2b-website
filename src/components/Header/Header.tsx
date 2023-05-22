import React, { useState } from "react";

//Styles
import styles from "./Header.module.css";

//Icons
import logo from "../../assets/img/logo.png";
import searchIcon from "../../assets/img/search.svg";
import shopIcon from "../../assets/img/shopping-bag.svg";
import cross from "../../assets/img/cross.svg";
import hamburger from "../../assets/img/menu-burger.svg";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectBasketSKU } from "../../store/selectors";
import { logout } from "../../store/slices/user";
import { clearCustomer } from "../../store/slices/customer";
import { deleteBasket } from "../../store/slices/basket";
import { toLocaleNumberString } from "../../common/Localization";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const totalQty = useAppSelector((state) => selectBasketSKU(state));
  const isLoggedIn = !!useAppSelector((state) => state.user.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.topheader}>
          <div
            className={menu ? styles.hamburgerOpen : styles.hamburger}
            onClick={() => setMenu(!menu)}>
            <img src={menu ? cross : hamburger} alt='hamburger' />
          </div>
          <div className={styles.logo}>
            <img width={"70px"} src={logo} alt='logo' />
          </div>
          <div className={styles.search}>
            <input type='search' placeholder='جستجو...' />
            <button>
              <img src={searchIcon} alt='search' />
            </button>
          </div>
          <div className={styles.buttons}>
            {isLoggedIn ? (
              <button
                className='btn btn-light2 ms-2'
                onClick={() => {
                  dispatch(logout());
                  dispatch(clearCustomer());
                  dispatch(deleteBasket());
                  navigate("/login");
                }}>
                خروج
              </button>
            ) : (
              <button
                className='btn btn-light2 ms-2'
                onClick={() => {
                  navigate("/login");
                }}>
                ورود | ثبت نام
              </button>
            )}

            <button
              className='btn btn-light2 position-relative'
              onClick={() => {
                navigate("/cart");
              }}>
              سبد خرید
              <img src={shopIcon} className='me-2' alt='shop' />
              {totalQty > 0 && (
                <span className={styles.itemCounter}>
                  {toLocaleNumberString(totalQty)}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
      <div className={styles.border}></div>

      <div className={styles.container}>
        <div className={styles.bottomheader}>
          <ul className={menu ? styles.navbaropen : styles.navbar}>
            <li className={styles.navitem}>
              <Link to='/home'>صفحه اصلی</Link>
            </li>
            <li className={styles.navitem}>
              <Link to='/shop'>فروشگاه</Link>
            </li>
            {/* <li className={styles.navitem}>
              <Link to='/blogs'>مقالات</Link>
            </li> */}
            <li className={styles.navitem}>
              <Link to='/aboutus'>درباره ما</Link>
            </li>
            <li className={styles.navitem}>
              <Link to='/contactus'>تماس با ما</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
