import { BrowserRouter, Routes, Route } from "react-router-dom";
// react-router-dom 써야함!
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Detail from "./Components/Detail.jsx";
import { PokeContextProvider } from "./Context/poke_context";
import { LangToggleBtnProvider } from "./Context/LangToggleBtn";
import { ThemeToggleBtnProvider } from "./Context/ThemeToggleBtn.jsx";

createRoot(document.getElementById("root")).render(
     <PokeContextProvider>
          <LangToggleBtnProvider>
               <ThemeToggleBtnProvider>
                    <BrowserRouter>
                         <Routes>
                              <Route index element={<App />} />
                              <Route path="detail/:id" element={<Detail />} />
                         </Routes>
                    </BrowserRouter>
               </ThemeToggleBtnProvider>
          </LangToggleBtnProvider>
     </PokeContextProvider>
);
