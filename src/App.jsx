import React from "react";
import "./App.css";
import Header from "./Components/Header";
import Search from "./Components/Search";
import CardList from "./Components/CardList";
import { PokeContextProvider } from "./Context/poke_context";
import { LangToggleBtnProvider } from "./Context/LangToggleBtn";
import { useContext } from "react";
import {
     ThemeToggleBtnContext,
     ThemeToggleBtnProvider,
} from "./Context/ThemeToggleBtn";

function Main({ children }) {
     const { isDark } = useContext(ThemeToggleBtnContext);
     return (
          <div className={`wrapper theme-${isDark}`}>
               <main>
                    {children}
                    <CardList />
               </main>
          </div>
     );
}

function App() {
     return (
          <PokeContextProvider>
               <LangToggleBtnProvider>
                    <ThemeToggleBtnProvider>
                         <Header />
                         <Main>
                              {" "}
                              <Search />
                         </Main>
                    </ThemeToggleBtnProvider>
               </LangToggleBtnProvider>
          </PokeContextProvider>
     );
}

export default App;
