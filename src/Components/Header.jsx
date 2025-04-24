import logo from "../assets/header_logo.png";
import "../styles/Header.css";
import Search from "../Components/Search";
import Utility from "./Utility";

import { useContext } from "react";
import { ThemeToggleBtnContext } from "../Context/ThemeToggleBtn";

function Header() {
     const { isDark } = useContext(ThemeToggleBtnContext);
     return (
          <header className={`${isDark === "dark" ? "darkMode" : ""}`}>
               <Utility />
               <img className="title_img" src={logo} />
               <Search />
          </header>
     );
}
export default Header;
