import { useContext } from "react";
import { PokeContext } from "../Context/poke_context";
import Card from "./Card";
import { LangToggleBtnContext } from "../Context/LangToggleBtn";

function CardList() {
     const pokeList = useContext(PokeContext);
     const { lang } = useContext(LangToggleBtnContext);
     return (
          <div className="card_container">
               {pokeList.map((item, index) => (
                    <Card
                         key={index}
                         name={lang === "kor" ? item.nameKor : item.nameEng}
                         image={item.image}
                         types={item.types}
                    />
               ))}
          </div>
     );
}
export default CardList;
