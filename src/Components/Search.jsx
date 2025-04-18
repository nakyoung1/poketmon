import "../styles/Search.css";
import { useContext, useRef } from "react";
import { PokeContext } from "../Context/poke_context";
import confetti from "canvas-confetti";

function Search() {
     const { dispatch, setIsModalOpen, state, setSelectedPokemon } =
          useContext(PokeContext);
     const inputRef = useRef(null);

     function handleReset() {
          dispatch({ type: "RESET" });
     }

     function handleSearch() {
          const keyword = inputRef.current.value;
          dispatch({ type: "SEARCH", payload: keyword });
     }

     function handleKeyUp(e) {
          if (e.key === "Enter") {
               handleSearch();
          }
     }

     const handleRandom = () => {
          const randomIndex = Math.floor(Math.random() * state.all.length);
          const poke = state.all[randomIndex];
          confetti({
               particleCount: 100,
               spread: 70,
               origin: { y: 0.6 },
          });
          setSelectedPokemon(poke);
          setIsModalOpen(true);
     };

     return (
          <div className="search-bar">
               <div className="search-left">
                    <p className="all" onClick={handleReset}>
                         전체보기
                    </p>
               </div>

               <div className="search-center">
                    <input
                         type="text"
                         placeholder="이름을 검색해주세요"
                         ref={inputRef}
                         onKeyUp={handleKeyUp}
                    />
                    <button onClick={handleSearch}>검색</button>
               </div>

               <div className="search-right">
                    <button className="random-btn" onClick={handleRandom}>
                         🎁 오늘의 포켓몬
                    </button>
               </div>
          </div>
     );
}
export default Search;
