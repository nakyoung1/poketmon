import "../styles/Search.css";
import { useContext, useRef } from "react";
import { PokeContext } from "../Context/poke_context";
import { LangToggleBtnContext } from "../Context/LangToggleBtn";
import confetti from "canvas-confetti";
function Search() {
     const {
          dispatch,
          setIsModalOpen,
          state,
          setSelectedPokemon,
          searchWithAutoFetch,
     } = useContext(PokeContext);

     const { lang } = useContext(LangToggleBtnContext);
     const inputRef = useRef(null);
     const btnRef = useRef(null);

     function handleReset() {
          dispatch({ type: "RESET" });
     }

     const handleSearch = (e) => {
          e.preventDefault();
          searchWithAutoFetch(inputRef.current.value);
          inputRef.current.value = "";
     };

     function handleKeyUp(e) {
          if (e.key === "Enter") {
               handleSearch(e);
          }
     }

     const handleRandom = () => {
          const randomIndex = Math.floor(Math.random() * state.all.length);
          const poke = state.all[randomIndex];
          confetti({
               particleCount: 100,
               spread: 80,
               origin: { y: 0.6 },
          });
          setSelectedPokemon(poke);
          setTimeout(() => {
               setIsModalOpen(true);
          }, 800);
     };
     return (
          <div className="search-bar">
               <div className="search-left">
                    <p className="all" onClick={handleReset}>
                         {lang === "kor"
                              ? "전체 포켓몬 보기"
                              : "View all Pokémon"}
                    </p>
               </div>

               <div className="search-center">
                    <input
                         type="text"
                         ref={inputRef}
                         onKeyUp={handleKeyUp}
                         placeholder={
                              lang === "kor" ? "아이디,이름" : "Id,name"
                         }
                    />

                    <button className="searchBtn" onClick={handleSearch}>
                         {lang === "kor" ? "검색" : "Search"}
                    </button>
               </div>

               <div className="search-right">
                    <button
                         ref={btnRef}
                         className="random-btn"
                         onClick={handleRandom}
                    >
                         {lang === "kor"
                              ? "🎁 오늘의 포켓몬"
                              : "🎁 Random Pokemon"}
                    </button>
               </div>
          </div>
     );
}
export default Search;
