import "../styles/Header.css";

import { LangToggleBtnContext } from "../Context/LangToggleBtn";
import { useContext } from "react";
import { ThemeToggleBtnContext } from "../Context/ThemeToggleBtn";
import { LoginStateContext } from "../Context/Login_context";

import dark from "../assets/theme/dark.png";
import light from "../assets/theme/light.png";
import { Link } from "react-router";
import login_lightmode from "../assets/login_lightmode.png";
import login_darkmode from "../assets/login_darkmode.png";
function Utility() {
     const { lang, handleLangClick } = useContext(LangToggleBtnContext);
     const { isDark, handleThemeToggle } = useContext(ThemeToggleBtnContext);
     const { user, logout, loginState } = useContext(LoginStateContext);

     return (
          <div className="utility">
               <button className="lang-toggle" onClick={handleLangClick}>
                    {lang === "kor" ? "English" : "한국어"}
               </button>
               <div className="userInfo">
                    {!loginState ? (
                         <div>
                              <Link to="/login">
                                   {isDark === "light" ? (
                                        <img src={login_lightmode} />
                                   ) : (
                                        <img src={login_darkmode} />
                                   )}
                              </Link>
                         </div>
                    ) : (
                         <div className="greetUser">
                              <p>
                                   {lang === "kor"
                                        ? `🎒 '${user?.displayName}' 트레이너 입장!`
                                        : `🎒 Trainer '${user?.displayName}' has entered!`}
                              </p>
                              <button onClick={logout}>logout</button>
                         </div>
                    )}
                    <img
                         onClick={handleThemeToggle}
                         className={`toggle-btn ${
                              isDark === "light" ? "dark" : "light"
                         }`}
                         src={isDark === "light" ? dark : light}
                         alt="theme toggle icon"
                    />
               </div>
          </div>
     );
}
export default Utility;
