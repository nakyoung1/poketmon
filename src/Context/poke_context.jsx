//poke_context.jsx

import { createContext, useReducer, useEffect, useState } from "react";

export const PokeContext = createContext();

const initialState = {
     all: [],
     filtered: [],
};

function pokeReducer(state, action) {
     switch (action.type) {
          case "SEARCH": {
               const keyword = action.payload.toLowerCase();

               const filtered = state.all.filter((p) => {
                    const isMatchName =
                         p.nameEng.toLowerCase().includes(keyword) ||
                         p.nameKor.includes(keyword);

                    const isExactId = Number(keyword) === p.id;

                    return isMatchName || isExactId;
               });

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
               };
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
               console.error(`포켓몬 ${id} 로딩 실패`, error);
               return null;
          }
     };
     const fetchAllPokemon = async () => {
          const total = 1025;
          const batchSize = 20;
          let allPokemon = [];

          for (let i = 1; i <= total; i += batchSize) {
               const currentBatchSize = Math.min(batchSize, total - i + 1);

               const batch = await Promise.all(
                    Array.from({ length: currentBatchSize }, (_, idx) =>
                         getPokemonData(i + idx)
                    )
               );

               allPokemon = [...allPokemon, ...batch.filter(Boolean)];
          }

          dispatch({ type: "APPEND_POKEMON", payload: allPokemon });
          setIsLoading(false);
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
