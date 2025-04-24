import React from "react";
import "./App.css";
import Header from "./Components/Header";
import CardList from "./Components/CardList";
import PokemonDialog from "./Components/PokemonDialog";
import TopButton from "./Components/TobBtn";
import DetailPage from "./Components/DetailPage";
import Signup from "./Components/Signup";
import Login from "./Components/Login";

import { PokeContextProvider } from "./Context/poke_context";
import { LangToggleBtnProvider } from "./Context/LangToggleBtn";
import { LoginStatetProvider } from "./Context/Login_context";

import {
     ThemeToggleBtnContext,
     ThemeToggleBtnProvider,
} from "./Context/ThemeToggleBtn";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";

function Main() {
     const { isDark } = useContext(ThemeToggleBtnContext);
     return (
          <div className={`wrapper theme-${isDark}`}>
               <Header />
               <main>
                    <CardList />
               </main>
               <TopButton />
               <PokemonDialog />
          </div>
     );
}

function App() {
     return (
          <LoginStatetProvider>
               <PokeContextProvider>
                    <LangToggleBtnProvider>
                         <ThemeToggleBtnProvider>
                              <BrowserRouter>
                                   <Routes>
                                        <Route path="/" element={<Main />} />
                                        <Route
                                             path="/detail/:id"
                                             element={<DetailPage />}
                                        />
                                        <Route
                                             path="login"
                                             element={<Login />}
                                        />
                                        <Route
                                             path="signup"
                                             element={<Signup />}
                                        />
                                   </Routes>
                              </BrowserRouter>
                         </ThemeToggleBtnProvider>
                    </LangToggleBtnProvider>
               </PokeContextProvider>
          </LoginStatetProvider>
     );
}

export default App;
