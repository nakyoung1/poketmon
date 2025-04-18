import "../styles/Card.css";
import { useContext } from "react";
import { ThemeToggleBtnContext } from "../Context/ThemeToggleBtn";

function Card({ id, name, image, types, handleCardClick }) {
     const { isDark } = useContext(ThemeToggleBtnContext);

     return (
          <div className={`card card-${isDark}`} onClick={handleCardClick}>
               <p className="poke_id">No.{id}</p>
               <p>{name}</p>
               <img src={image} />
               <div className="type_container">
                    {types.map((item) => (
                         <span className={`poke_type ${item}`} key={item}>
                              <p className="type-label">{item}</p>
                         </span>
                    ))}
               </div>
          </div>
     );
}

export default Card;
