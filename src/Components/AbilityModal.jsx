import { useContext, useRef, useEffect } from "react";
import { AbilityContext } from "../Context/ability_context";
import { LangToggleBtnContext } from "../Context/LangToggleBtn";

import "../styles/modal.css";
function AbilityModal() {
     const { isAbilityModalOpen, setIsAbilityModalOpen, abilityDetail } =
          useContext(AbilityContext);
     const { lang } = useContext(LangToggleBtnContext);

     const dialogRef = useRef();

     useEffect(() => {
          if (isAbilityModalOpen && dialogRef.current) {
               dialogRef.current.showModal();
          } else if (dialogRef.current?.open) {
               dialogRef.current.close();
          }
     }, [isAbilityModalOpen]);

     if (!abilityDetail) return null;

     return (
          <dialog ref={dialogRef} className="ability-dialog">
               <h3>{abilityDetail.name}</h3>
               <p>{abilityDetail.effect}</p>
               <button onClick={() => setIsAbilityModalOpen(false)}>
                    {lang === "kor" ? "닫기" : "Close"}
               </button>
          </dialog>
     );
}

export default AbilityModal;
