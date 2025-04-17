import React from "react";
import "./App.css";

function App() {
     return (
          <div className="wrapper">
               <header>
                    <div>
                         <button>lan</button>
                         <button>drak</button>
                    </div>
                    <h1>포켓몬도감</h1>
                    <div>
                         <input type="text" />
                         <button>검색</button>
                    </div>
               </header>
               <main>
                    <div>
                         <div className="card"></div>
                    </div>
               </main>
          </div>
     );
}

export default App;
