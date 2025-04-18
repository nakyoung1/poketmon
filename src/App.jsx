import React from "react";
import "./App.css";
import Header from "./Components/Header";
import Search from "./Components/Search";
import CardList from "./Components/CardList";
import PokemonDialog from "./Components/PokemonDialog";
import AbilityModal from "./Components/AbilityModal";

import { PokeContextProvider } from "./Context/poke_context";
import { LangToggleBtnProvider } from "./Context/LangToggleBtn";
import { AbilityProvider } from "./Context/ability_context";

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
          <>
               <PokeContextProvider>
                    <LangToggleBtnProvider>
                         <ThemeToggleBtnProvider>
                              <AbilityProvider>
                                   <Header />
                                   <Main>
                                        <Search />
                                        <PokemonDialog />
                                   </Main>

                                   <AbilityModal />
                              </AbilityProvider>
                         </ThemeToggleBtnProvider>
                    </LangToggleBtnProvider>
               </PokeContextProvider>
          </>
     );
}

export default App;
