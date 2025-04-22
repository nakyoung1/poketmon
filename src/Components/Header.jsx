import logo from "../assets/header_logo.png";
import "../styles/Header.css";
import Search from "../Components/Search";

import { LangToggleBtnContext } from "../Context/LangToggleBtn";
import { useContext } from "react";
import { ThemeToggleBtnContext } from "../Context/ThemeToggleBtn";

import dark from "../assets/theme/dark.png";
import light from "../assets/theme/light.png";

function Header() {
     const { lang, handleLangClick } = useContext(LangToggleBtnContext);
     const { isDark, handleThemeToggle } = useContext(ThemeToggleBtnContext);

     return (
          <header className={`${isDark === "dark" ? "darkMode" : ""}`}>
               <div className="utility">
                    <button className="lang-toggle" onClick={handleLangClick}>
                         {lang === "kor" ? "English" : "한국어"}
                    </button>
                    <img
                         onClick={handleThemeToggle}
                         className={`toggle-btn ${
                              isDark === "light" ? "dark" : "light"
                         }`}
                         src={isDark === "light" ? dark : light}
                         alt="theme toggle icon"
                    />
               </div>
               <img className="title_img" src={logo} />
               <Search />
          </header>
     );
}
export default Header;
