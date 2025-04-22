import { useContext } from "react";
import { PokeContext } from "../Context/poke_context";
import Card from "./Card";
import Loading from "./Loading";
import noResult from "../assets/no_result.gif";

import { LangToggleBtnContext } from "../Context/LangToggleBtn";

function CardList() {
     const { dispatch, isLoading, state, setSelectedPokemon, setIsModalOpen } =
          useContext(PokeContext);
     const { lang } = useContext(LangToggleBtnContext);

     const handleCardClick = (id) => {
          const poke = state.all.find((p) => p.id === id);
          setSelectedPokemon(poke);
          setIsModalOpen(true);
     };

     if (isLoading) {
          return <Loading />;
          // return <div className="text-center mt-10">로딩 중...</div>;
     } else if (state.filtered.length === 0) {
          return (
               <div className="no-results">
                    {" "}
                    <p>🔍 포켓몬이 없어요!</p>
                    <p>다시 한번 확인해볼까요?</p>
                    <img src={noResult} />
               </div>
          );
     } else {
          return (
               <>
                    <div className="card_container">
                         {state.filtered.map((item, index) => (
                              <Card
                                   key={index}
                                   id={item.id}
                                   name={
                                        lang === "kor"
                                             ? item.nameKor
                                             : item.nameEng
                                   }
                                   image={item.image}
                                   types={item.types}
                                   handleCardClick={() => {
                                        setSelectedPokemon(item);
                                        setIsModalOpen(true);
                                   }}
                              />
                         ))}
                    </div>
                    {state.filtered.length === state.displayed.length &&
                         state.displayed.length < state.all.length && (
                              <button
                                   className="load-more-btn"
                                   onClick={() =>
                                        dispatch({ type: "LOAD_MORE" })
                                   }
                              >
                                   🔽 더 보기
                              </button>
                         )}
               </>
          );
     }
}

export default CardList;
