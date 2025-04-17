import { createContext, useState } from "react";

export const LangToggleBtnContext = createContext();

export function LangToggleBtnProvider({ children }) {
     const [lang, setLang] = useState("kor");

     const handleLangClick = () => {
          setLang((prev) => (prev === "kor" ? "eng" : "kor"));
     };

     return (
          <LangToggleBtnContext.Provider value={{ handleLangClick, lang }}>
               {children}
          </LangToggleBtnContext.Provider>
     );
}
