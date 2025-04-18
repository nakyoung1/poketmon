import { useContext } from "react";
import { PokeContext } from "../Context/poke_context";
import Card from "./Card";
import Loading from "./Loading";

import { LangToggleBtnContext } from "../Context/LangToggleBtn";

function CardList() {
     const { isLoading, state, setSelectedPokemon, setIsModalOpen } =
          useContext(PokeContext);
     const { lang } = useContext(LangToggleBtnContext);

     const handleCardClick = (id) => {
          const poke = state.all.find((p) => p.id === id);
          setSelectedPokemon(poke);
          setIsModalOpen(true);
     };

     return (
          <div className="card_container">
               {isLoading && <Loading />}
               {state.filtered.map((item, index) => (
                    <Card
                         key={index}
                         id={item.id}
                         name={lang === "kor" ? item.nameKor : item.nameEng}
                         image={item.image}
                         types={item.types}
                         handleCardClick={() => {
                              setSelectedPokemon(item);
                              setIsModalOpen(true);
                         }}
                    />
               ))}
          </div>
     );
}
export default CardList;
