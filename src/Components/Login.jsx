import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { auth } from "../firebase-config";
import "../styles/Login.css";

import logo from "../assets/header_logo.png";
import Utility from "./Utility";
import { LangToggleBtnContext } from "../Context/LangToggleBtn";
import { ThemeToggleBtnContext } from "../Context/ThemeToggleBtn";
import { LoginStateContext } from "../Context/Login_context";

function Login() {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const { lang } = useContext(LangToggleBtnContext);
     const { isDark } = useContext(ThemeToggleBtnContext);
     const { setLoginState } = useContext(LoginStateContext);
     let nevigate = useNavigate();

     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
               );
               console.log("로그인 성공", userCredential.user);
               setLoginState(true);
               nevigate("/");
          } catch (error) {
               console.log("로그인 오류", error.message);
               alert("이메일이나 비밀번호가 맞지 않습니다.");
          }
     };

     return (
          <div className={`login-all ${isDark === "dark" ? "darkMode" : ""}`}>
               <Utility />
               <div
                    className={`login-container ${
                         isDark === "dark" ? "darkMode" : ""
                    }`}
               >
                    <img
                         className="title_img"
                         src={logo}
                         onClick={() => nevigate("/")}
                    />
                    <form onSubmit={handleSubmit} className="login-form">
                         <label htmlFor="email">
                              {lang === "kor" ? "이메일" : "Email"}
                         </label>
                         <input
                              type="email"
                              placeholder={
                                   lang === "kor"
                                        ? "이메일 입력"
                                        : "Email adress"
                              }
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                         />

                         <label htmlFor="password">
                              {lang === "kor" ? "비밀번호" : "Password"}
                         </label>
                         <input
                              type="password"
                              placeholder={
                                   lang === "kor" ? "비밀번호 입력" : "Password"
                              }
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                         />

                         <button type="submit">Login</button>

                         <div className="signup-link">
                              <span>
                                   {lang === "kor"
                                        ? "계정이 없으신가요?"
                                        : "Don't have an account?"}
                              </span>

                              <button
                                   type="button"
                                   onClick={() => nevigate("/signup")}
                              >
                                   {lang === "kor" ? "회원가입" : "Signup"}
                              </button>
                         </div>
                    </form>
               </div>
          </div>
     );
}
export default Login;
