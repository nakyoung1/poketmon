import { useState, useContext } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router";
import "../styles/Signup.css";
import logo from "../assets/header_logo.png";
import Utility from "./Utility";
import { LangToggleBtnContext } from "../Context/LangToggleBtn";
import { ThemeToggleBtnContext } from "../Context/ThemeToggleBtn";
import { LoginStateContext } from "../Context/Login_context";

function Signup() {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");
     const [confirmPassword, setconfirmPassword] = useState("");
     const [nickname, setNickname] = useState("");
     const { lang } = useContext(LangToggleBtnContext);
     const { isDark } = useContext(ThemeToggleBtnContext);

     let navigate = useNavigate();

     const handleSubmit = async (e) => {
          e.preventDefault();
          if (password !== confirmPassword) {
               if (lang === "kor") {
                    alert("비밀번호가 일치하지 않습니다.");
                    return;
               } else {
                    alert("Password does not match.");
               }
          }
          if (email && password && nickname === null) {
               if (lang === "kor") {
                    alert("모든 항목을 입력해 주세요");
                    return;
               } else {
                    alert("Please enter all items");
               }
          }

          try {
               const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
               );
               await updateProfile(userCredential.user, {
                    displayName: nickname,
               });
               console.log("회원가입 성공", userCredential.user);
               navigate("/login");
          } catch (error) {
               console.log("회원가입 오류", error.message);
          }
     };
     return (
          <div className={`signup-all ${isDark === "dark" ? "darkMode" : ""}`}>
               <Utility />
               <div className="signup-container">
                    <img
                         className="title_img"
                         src={logo}
                         onClick={() => navigate("/")}
                    />
                    <form onSubmit={handleSubmit} className="signup-form">
                         <h2> {lang === "kor" ? "회원가입" : "Sign Up"}</h2>

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
                              id="password"
                              placeholder={
                                   lang === "kor"
                                        ? "비밀번호는 6자 이상 입니다"
                                        : "at least 6 characters"
                              }
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                         />

                         <label htmlFor="confirmPassword">
                              {lang === "kor"
                                   ? "비밀번호 확인"
                                   : "Confirmed Password"}
                         </label>
                         <input
                              type="password"
                              id="confirmPassword"
                              placeholder={
                                   lang === "kor"
                                        ? "비밀번호 확인"
                                        : "Confirmed Password"
                              }
                              value={confirmPassword}
                              onChange={(e) =>
                                   setconfirmPassword(e.target.value)
                              }
                         />
                         <label htmlFor="nickname">
                              {lang === "kor" ? "닉네임" : "Nickname"}
                         </label>
                         <input
                              type="text"
                              id="nickname"
                              placeholder={
                                   lang === "kor"
                                        ? "닉네임을 입력해주세요"
                                        : "Your nickname"
                              }
                              value={nickname}
                              onChange={(e) => setNickname(e.target.value)}
                         />

                         <button type="submit">
                              {lang === "kor" ? "회원가입" : "Sign Up"}
                         </button>
                    </form>
               </div>
          </div>
     );
}

export default Signup;
