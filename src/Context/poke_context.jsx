//poke_context.jsx

import { createContext, useReducer, useEffect, useState, useRef } from "react";

export const PokeContext = createContext();

const initialState = {
     all: [],
     filtered: [],
     offset: 0,
     hasMore: true,
};

function pokeReducer(state, action) {
     switch (action.type) {
          case "SEARCH": {
               const keyword = action.payload.toLowerCase();
               const filtered = state.all.filter(
                    (p) =>
                         p.nameEng.toLowerCase().includes(keyword) ||
                         p.nameKor.includes(keyword) ||
                         String(p.id) === keyword
               );

               return { ...state, filtered };
          }
          case "RESET": {
               return {
                    ...state,
                    filtered: state.all,
               };
          }
          case "RANDOM": {
               return {
                    state,
               };
          }
          case "APPEND_POKEMON":
               return {
                    ...state,
                    all: [...state.all, ...action.payload],
                    filtered: [...state.filtered, ...action.payload],
                    hasMore: action.payload.length > 0,
               };
          default:
               return state;
     }
}

export function PokeContextProvider({ children }) {
     const [state, dispatch] = useReducer(pokeReducer, initialState);
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [selectedPokemon, setSelectedPokemon] = useState(null);
     const [isLoading, setIsLoading] = useState(false);
     const offsetRef = useRef(0);
     const isFetching = useRef(false);
     const hasLoadedOnce = useRef(false);

     const getPokemonData = async (id) => {
          const res1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
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
               image: data1.sprites.other["official-artwork"].front_default,
               types: data1.types.map((t) => t.type.name),
               weight: data1.weight,
               height: data1.height,
               abilities: data1.abilities.map((a) => a.ability.name),
               stats: data1.stats.map((s) => ({
                    name: s.stat.name,
                    value: s.base_stat,
               })),
          };
     };

     const fetchNextPokemons = async (start, limit = 50) => {
          const results = [];
          for (let i = start; i < start + limit && i < 1025; i++) {
               const poke = await getPokemonData(i + 1);
               if (poke) results.push(poke);
          }
          return results;
     };

     useEffect(() => {
          const loadInitial = async () => {
               if (hasLoadedOnce.current) return;
               hasLoadedOnce.current = true;

               const initialData = await fetchNextPokemons(0);
               dispatch({ type: "APPEND_POKEMON", payload: initialData });
               offsetRef.current = initialData.length;
          };
          loadInitial();
     }, []);

     useEffect(() => {
          const handleScroll = async () => {
               const { scrollTop, scrollHeight, clientHeight } =
                    document.documentElement;

               if (
                    scrollTop + clientHeight >= scrollHeight - 100 &&
                    state.hasMore &&
                    !isFetching.current
               ) {
                    isFetching.current = true;
                    setIsLoading(true); // 👈 로딩 시작

                    const nextData = await fetchNextPokemons(offsetRef.current);
                    dispatch({ type: "APPEND_POKEMON", payload: nextData });
                    offsetRef.current += nextData.length;

                    setIsLoading(false); // 👈 로딩 끝
                    isFetching.current = false;
               }
          };

          window.addEventListener("scroll", handleScroll);
          return () => window.removeEventListener("scroll", handleScroll);
     }, [state.hasMore]);

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
               }}
          >
               {children}
          </PokeContext.Provider>
     );
}
