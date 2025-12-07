import React, { useContext, useState, useEffect } from "react";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const Navbar = ({setShowLogin}) => {
  const [menu, setMenu] = useState("home");
  const { getTotalCartAmount } = useContext(StoreContext);

  // Auto update menu khi scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: "footer", name: "contact-us" },
        { id: "app-download", name: "mobile-app" },
        { id: "explore-menu", name: "menu" },
      ];

      const scrollPosition = window.scrollY;

      for (let i = 0; i < sections.length; i++) {
        const section = document.getElementById(sections[i].id);

        if (section && section.offsetTop <= scrollPosition + 150) {
          setMenu(sections[i].name);
          history.replaceState(null, "", `#${sections[i].id}`);
          return;
        }
      }

      if (scrollPosition < 200) {
        setMenu("home");
        history.replaceState(null, "", window.location.pathname);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} alt="" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link
          to="/"
          onClick={() => setMenu("home")}
          className={menu === "home" ? "active" : ""}
        >
          home
        </Link>

        <a
          href="#explore-menu"
          onClick={() => setMenu("menu")}
          className={menu === "menu" ? "active" : ""}
        >
          menu
        </a>

        <a
          href="#app-download"
          onClick={() => setMenu("mobile-app")}
          className={menu === "mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>

        <a
          href="#footer"
          onClick={() => setMenu("contact-us")}
          className={menu === "contact-us" ? "active" : ""}
        >
          contact us
        </a>
      </ul>

      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />

        <div className="navbar-search-icon">
          <Link to="/cart">
            <img src={assets.basket_icon} alt="" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        <button onClick={()=>setShowLogin(true)}>sign in</button>
      </div>
    </div>
  );
};

export default Navbar;
