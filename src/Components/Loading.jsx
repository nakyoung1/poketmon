import { Player } from "@lottiefiles/react-lottie-player";
import pokeballLoading from "../assets/loading.json";

export default function Loading({ size = 120 }) {
     return (
          <div className="loading-wrapper">
               <Player
                    autoplay
                    loop
                    src={pokeballLoading}
                    style={{ width: size, height: size }}
               />
          </div>
     );
}
