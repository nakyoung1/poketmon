import "../styles/Card.css";
import { useContext } from "react";
import { ThemeToggleBtnContext } from "../Context/ThemeToggleBtn";
import { useNavigate } from "react-router-dom";

function Card({ id, name, image, types }) {
     const { isDark } = useContext(ThemeToggleBtnContext);
     const navigate = useNavigate();

     return (
          <div
               onClick={() => navigate(`/detail/${id}`)}
               className={`card card-${isDark}`}
               style={{ cursor: "pointer" }}
          >
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
