//poke_context.jsx

import { createContext, useReducer, useEffect, useState } from "react";

export const PokeContext = createContext({});

function pokeReducer(state, action) {}

export function PokeContextProvider({ children }) {
     const [pokeList, setPokeList] = useState([]);

     const getPokemonData = async (id) => {
          // 1. /pokemon/{id} → 타입, 이미지 등
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
          };
     };

     useEffect(() => {
          const getPoke = async () => {
               const allPokemons = await Promise.all(
                    Array.from({ length: 565 }, (_, i) => getPokemonData(i + 1))
               );
               setPokeList(allPokemons);
               console.log(allPokemons);
          };
          getPoke();
     }, []);

     return (
          <PokeContext.Provider value={pokeList}>
               {children}
          </PokeContext.Provider>
     );
}
