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
          case "APPEND_POKEMON":
               return {
                    ...state,
                    all: action.payload,
                    displayed: action.payload.slice(0, 50),
                    filtered: action.payload.slice(0, 50),
               };
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
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [selectedPokemon, setSelectedPokemon] = useState(null);
     const [isLoading, setIsLoading] = useState(true);

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

     const fetchInitialPokemon = async () => {
          try {
               const promises = Array.from({ length: 50 }, (_, i) =>
                    getPokemonData(i + 1)
               );
               const result = await Promise.all(promises);
               dispatch({
                    type: "APPEND_POKEMON",
                    payload: result.filter(Boolean),
               });
               setIsLoading(false);
          } catch (error) {
               console.error("초기 포켓몬 로딩 실패", error);
          }
     };

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
          fetchInitialPokemon(); // 최초엔 50개만
     }, []);

     return (
          <PokeContext.Provider
               value={{
                    state,
                    dispatch,
                    isLoading,
                    isModalOpen,
                    setIsModalOpen,
                    selectedPokemon,
                    setSelectedPokemon,
                    searchWithAutoFetch, // 검색용 커스텀 핸들러 추가
               }}
          >
               {children}
          </PokeContext.Provider>
     );
}
