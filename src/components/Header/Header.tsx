import React, { useState } from "react";

//Styles
import styles from "./Header.module.css";

//Icons
import logo from "../../assets/img/logo.png";
import searchIcon from "../../assets/img/search.svg";
import shopIcon from "../../assets/img/shopping-bag.svg";
import cross from "../../assets/img/cross.svg";
import hamburger from "../../assets/img/menu-burger.svg";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { selectBasketSKU } from "../../store/selectors";

const Header = () => {
  const [menu, setMenu] = useState(false);
  const totalQty = useAppSelector((state) => selectBasketSKU(state));
  const isLoggedIn = !!useAppSelector((state) => state.user.token);

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
              <Link
                onClick={() => {
                  //   authCtx.logout();
                }}
                to='/login'>
                خروج
              </Link>
            ) : (
              <Link to='/'>ورود | ثبت نام </Link>
            )}

            <Link to='/cart' className={styles.cart}>
              سبد خرید
              <img src={shopIcon} alt='shop' />
              {totalQty > 0 && (
                <span className={styles.itemCounter}>{totalQty}</span>
              )}
            </Link>
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
