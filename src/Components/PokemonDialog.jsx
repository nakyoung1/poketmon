import { useContext, useRef, useEffect } from "react";
import { PokeContext } from "../Context/poke_context";
import { LangToggleBtnContext } from "../Context/LangToggleBtn";
import { TYPE_NAME_KR, STAT_NAME_KR } from "../data/Translation";

import "../styles/modal.css";
import Loading from "./Loading";

function PokemonDialog() {
     const { isLoading, isModalOpen, setIsModalOpen, selectedPokemon } =
          useContext(PokeContext);

     const { lang } = useContext(LangToggleBtnContext);
     const dialogRef = useRef();

     useEffect(() => {
          if (isModalOpen && dialogRef.current) {
               dialogRef.current.showModal();
          } else if (dialogRef.current?.open) {
               dialogRef.current.close();
          }
     }, [isModalOpen]);

     if (!selectedPokemon) return null;

     return (
          <dialog
               ref={dialogRef}
               onClick={() => setIsModalOpen(false)}
               className="pokemon-dialog"
          >
               {isLoading && <Loading />}
               <h2>
                    {lang === "kor"
                         ? `${selectedPokemon.nameKor} `
                         : `${selectedPokemon.nameEng} `}
               </h2>
               <p>ID: #{selectedPokemon.id}</p>
               <img src={selectedPokemon.image} alt={selectedPokemon.nameKor} />
               <p>
                    {lang === "kor" ? "타입 : " : "Type : "}
                    {selectedPokemon.types
                         .map((type) =>
                              lang === "kor" ? TYPE_NAME_KR[type] || type : type
                         )
                         .join(", ")}
               </p>
               <p>
                    {lang === "kor" ? "키 : " : "Height : "}
                    {selectedPokemon.height / 10}m
               </p>
               <p>
                    {lang === "kor" ? "몸무게 : " : "Weight : "}
                    {selectedPokemon.weight / 10}kg
               </p>
               <p>
                    {lang === "kor" ? "특성 : " : "Ability : "}
                    {selectedPokemon.abilities.join(", ")}
               </p>
               <div className="stat-list">
                    {selectedPokemon.stats.map((s, idx) => (
                         <div key={idx} className="stat-bar">
                              <span className="stat-label">
                                   {lang === "kor"
                                        ? STAT_NAME_KR[s.name] || s.name
                                        : s.name.toUpperCase()}
                              </span>
                              <div className="bar-bg">
                                   <div
                                        className="bar-fill"
                                        style={{ width: `${s.value / 2}%` }}
                                   ></div>
                              </div>
                              <span className="stat-value">{s.value}</span>
                         </div>
                    ))}
               </div>
               <button onClick={() => setIsModalOpen(false)}>
                    {lang === "kor" ? "닫기" : "Close"}
               </button>
          </dialog>
     );
}

export default PokemonDialog;
