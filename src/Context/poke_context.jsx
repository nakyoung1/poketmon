// //poke_context.jsx

import { createContext, useReducer, useEffect, useState } from "react";

export const PokeContext = createContext();

const initialState = {
     all: [],
     displayed: [],
     filtered: [],
};

function pokeReducer(state, action) {
     switch (action.type) {
          case "APPEND_POKEMON": {
               const newAll = [...state.all, ...action.payload];
               return {
                    ...state,
                    all: newAll,
                    displayed: newAll.slice(0, 50),
                    filtered:
                         state.filtered.length === state.displayed.length
                              ? newAll.slice(0, 50)
                              : state.filtered,
               };
          }
          case "LOAD_MORE": {
               const next = state.all.slice(0, state.displayed.length + 50);
               return {
                    ...state,
                    displayed: next,
                    filtered: next,
               };
          }
          case "SEARCH": {
               const keyword = action.payload.trim();
               const isNumeric = /^\d+$/.test(keyword);
               const filtered = state.all.filter((p) => {
                    if (isNumeric) {
                         return String(p.id) === keyword;
                    } else {
                         return (
                              p.nameEng
                                   .toLowerCase()
                                   .includes(keyword.toLowerCase()) ||
                              p.nameKor.includes(keyword)
                         );
                    }
               });
               return { ...state, filtered };
          }
          case "RESET":
               return { ...state, filtered: state.displayed };
          default:
               return state;
     }
}

export function PokeContextProvider({ children }) {
     const [state, dispatch] = useReducer(pokeReducer, initialState);
     const [selectedPokemon, setSelectedPokemon] = useState(null);
     const [isLoading, setIsLoading] = useState(true);
     const [isModalOpen, setIsModalOpen] = useState(false);

     const getPokemonData = async (id) => {
          try {
               const res1 = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${id}`
               );
               const data1 = await res1.json();
               const res2 = await fetch(
                    `https://pokeapi.co/api/v2/pokemon-species/${id}`
               );
               const data2 = await res2.json();

               const name_ko = data2.names.find(
                    (n) => n.language.name === "ko"
               )?.name;

               return {
                    id,
                    nameEng: data1.name,
                    nameKor: name_ko || data1.name,
                    image: data1.sprites.other["official-artwork"]
                         .front_default,
                    types: data1.types.map((t) => t.type.name),
                    weight: data1.weight,
                    height: data1.height,
                    abilities: data1.abilities.map((a) => a.ability.name),
                    stats: data1.stats.map((s) => ({
                         name: s.stat.name,
                         value: s.base_stat,
                    })),
               };
          } catch (error) {
               console.error(`포켓몬 #${id} 불러오기 실패`, error);
               return null;
          }
     };

     // const fetchInitialPokemon = async () => {
     //      try {
     //           const promises = Array.from({ length: 1025 }, (_, i) =>
     //                getPokemonData(i + 1)
     //           );
     //           const result = await Promise.all(promises);
     //           dispatch({
     //                type: "APPEND_POKEMON",
     //                payload: result.filter(Boolean),
     //           });
     //           setIsLoading(false);
     //      } catch (error) {
     //           console.error("전체 포켓몬 로딩 실패", error);
     //      }
     // };

     const fetchAllPokemon = async () => {
          try {
               const promises = Array.from({ length: 1025 }, (_, i) =>
                    getPokemonData(i + 1)
               );
               const result = await Promise.all(promises);
               dispatch({
                    type: "APPEND_POKEMON",
                    payload: result.filter(Boolean),
               });
               setIsLoading(false);
          } catch (error) {
               console.error("전체 포켓몬 로딩 실패", error);
          }
     };

     const searchWithAutoFetch = async (keyword) => {
          if (state.all.length < 1025) {
               setIsLoading(true);
               await fetchAllPokemon();
               setIsLoading(false);
          }
          dispatch({ type: "SEARCH", payload: keyword });
     };

     useEffect(() => {
          fetchAllPokemon();
     }, []);

     return (
          <PokeContext.Provider
               value={{
                    state,
                    dispatch,
                    isLoading,
                    selectedPokemon,
                    setSelectedPokemon,
                    searchWithAutoFetch,
                    setIsModalOpen,
                    isModalOpen,
               }}
          >
               {children}
          </PokeContext.Provider>
     );
}
