import { createContext, useState, useEffect } from "react";
import { Link } from "react-router";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "../firebase-config";

export const LoginStateContext = createContext();

export function LoginStatetProvider({ children }) {
     const [user, setUser] = useState(null);
     const [loginState, setLoginState] = useState(false);

     useEffect(() => {
          const unsubscribe = onAuthStateChanged(auth, (curUser) => {
               setUser(curUser);
          });
          return () => unsubscribe();
     }, []);

     const logout = () => {
          signOut(auth)
               .then(() => {
                    setLoginState(false);
                    console.log("로그아웃 성공");
               })
               .catch((e) => {
                    console.log(e);
               });
     };
     return (
          <LoginStateContext.Provider
               value={{ user, logout, loginState, setLoginState }}
          >
               {children}
          </LoginStateContext.Provider>
     );
}
