import { createContext, useState } from "react";

export const AbilityContext = createContext();

export function AbilityProvider({ children }) {
     const [abilityDetail, setAbilityDetail] = useState(null);
     const [isAbilityModalOpen, setIsAbilityModalOpen] = useState(false);

     const getAbilityDetail = async (abilityName, lang = "ko") => {
          const res = await fetch(
               `https://pokeapi.co/api/v2/ability/${abilityName}`
          );
          const data = await res.json();

          const name = data.names.find((n) => n.language.name === lang)?.name;
          const effect = data.effect_entries.find(
               (e) => e.language.name === lang
          )?.short_effect;

          setAbilityDetail({ name: name || abilityName, effect: effect || "" });
          setIsAbilityModalOpen(true);
     };

     return (
          <AbilityContext.Provider
               value={{
                    abilityDetail,
                    isAbilityModalOpen,
                    setIsAbilityModalOpen,
                    getAbilityDetail, // 🔥 이렇게 context로 내려보내기!
               }}
          >
               {children}
          </AbilityContext.Provider>
     );
}
