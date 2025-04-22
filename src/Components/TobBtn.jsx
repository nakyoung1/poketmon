import { useEffect, useState } from "react";
import pokeball from "../assets/poketball_close.png";

function TopButton() {
     const [isVisible, setIsVisible] = useState(false);

     const showToggle = () => {
          setIsVisible(window.scrollY > 300);
     };

     const scrollToTop = () => {
          window.scrollTo({ top: 0, behavior: "smooth" });
     };

     useEffect(() => {
          window.addEventListener("scroll", showToggle);
          return () => window.removeEventListener("scroll", showToggle);
     }, []);

     return (
          isVisible && (
               <button
                    onClick={scrollToTop}
                    style={{
                         position: "fixed",
                         bottom: "2rem",
                         right: "2rem",
                         width: "60px",
                         height: "60px",
                         borderRadius: "50%",
                         backgroundColor: "white",
                         border: "none",
                         boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                         cursor: "pointer",
                         zIndex: 999,
                         padding: 0,
                         display: "flex",
                         alignItems: "center",
                         justifyContent: "center",
                    }}
               >
                    <img
                         src={pokeball}
                         alt="Back to Top"
                         style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "contain",
                              animation: "spin 1.5s linear infinite",
                         }}
                    />
               </button>
          )
     );
}

export default TopButton;
