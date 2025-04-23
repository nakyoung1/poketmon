import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { PokeContext } from "../Context/poke_context";
import { LangToggleBtnContext } from "../Context/LangToggleBtn";
import { TYPE_NAME_KR, STAT_NAME_KR } from "../data/Translation";
import { ThemeToggleBtnContext } from "../Context/ThemeToggleBtn";

import "../styles/DetailPage.css";
import Loading from "./Loading";

function Detail() {
     const { id } = useParams();
     const { state, isLoading } = useContext(PokeContext);
     const { isDark } = useContext(ThemeToggleBtnContext);
     const { lang } = useContext(LangToggleBtnContext);

     //  const [selectedPokemon, setSelectedPokemon] = useState(null);

     //  useEffect(() => {
     //       const poke = state.all.find((p) => String(p.id) === id);
     //       setSelectedPokemon(poke);
     //  }, [id, state.all]);
     const selectedPokemon = state.all.find((p) => String(p.id) === id);
     useEffect(() => {
          console.log("🔥 lang 변경됨:", lang);
     }, [lang]);
     if (!selectedPokemon || isLoading) return <Loading />;

     return (
          <div className={`pokemon-detail ${isDark === "dark" ? "dark" : ""}`}>
               {isLoading && <Loading />}
               <h2>
                    {lang === "kor"
                         ? selectedPokemon.nameKor
                         : selectedPokemon.nameEng}
               </h2>
               <p>ID: #{selectedPokemon.id}</p>
               <img
                    src={selectedPokemon.image}
                    alt={
                         lang === "kor"
                              ? selectedPokemon.nameKor
                              : selectedPokemon.nameEng
                    }
               />
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
          </div>
     );
}

export default Detail;
