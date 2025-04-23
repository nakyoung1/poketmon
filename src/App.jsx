import React from "react";
import "./App.css";
import Header from "./Components/Header";
import CardList from "./Components/CardList";
import PokemonDialog from "./Components/PokemonDialog";
import TopButton from "./Components/TobBtn";

import { PokeContextProvider } from "./Context/poke_context";
import { LangToggleBtnProvider } from "./Context/LangToggleBtn";

import { useContext } from "react";
import {
     ThemeToggleBtnContext,
     ThemeToggleBtnProvider,
} from "./Context/ThemeToggleBtn";
import Detail from "./Components/Detail";

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
          <>
               <PokeContextProvider>
                    <LangToggleBtnProvider>
                         <ThemeToggleBtnProvider>
                              <Header />
                              <Main />
                              <TopButton />
                              <Detail />
                              <PokemonDialog />
                         </ThemeToggleBtnProvider>
                    </LangToggleBtnProvider>
               </PokeContextProvider>
          </>
     );
}

export default App;
