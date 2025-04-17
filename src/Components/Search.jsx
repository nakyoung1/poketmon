import "../styles/Search.css";

function Search() {
     return (
          <div className="search">
               <input type="text" placeholder="이름을 검색해주세요" />
               <button>검색</button>
          </div>
     );
}
export default Search;
