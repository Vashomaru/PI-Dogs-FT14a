import { useState, useEffect } from "react";
import SearchBar from "../search-bar/search-bar.component";
import DogCard from "../dog-card/dog-card.component";

function CardContainer(props) {
  const { state, temperament } = props;
  const initialVisible = state.slice(0, 8);
  const [cardState, setCardState] = useState(state);
  const [visiblePage, setVisiblePage] = useState(initialVisible);
  const [pageIndex, setPageIndex] = useState(1);
  const [order, setOrder] = useState("ASC");
  const [type, setType] = useState("NAME");
  const [temperamentFilter, setTemperamentFilter] = useState("");
  const [originFilter, setOriginFilter] = useState("ALL");
  const [clicked , setClicked] = useState(false)

  const handleButtonClick = (e) => {
    e.preventDefault();
    if (e.target.name === "next" && cardState.length / (pageIndex * 8) > 1)
      setPageIndex(pageIndex + 1);
    if (e.target.name === "prev" && pageIndex > 1) setPageIndex(pageIndex - 1);
    if (e.target.name === "order") {
      if (e.target.value === order){
          if(!clicked) setClicked(true)
          setOrder("DESC");
      } 
      if (e.target.value !== order){
        if(!clicked) setClicked(true)
        setOrder("ASC");
    }  
    }
    if (e.target.name === "type") {
      if (e.target.value === type){
        if(!clicked) setClicked(true)
        setType("WEIGHT");
      }
      if (e.target.value !== type){
        if(!clicked) setClicked(true)
        setType("NAME");
      } 
    }
    if (e.target.name === "origin") {
      if (originFilter === "ALL"){
        if(!clicked) setClicked(true) 
        setOriginFilter("OLD");
      } 
      if (originFilter === "OLD"){
        if(!clicked) setClicked(true) 
        setOriginFilter("NEW");  
      } 
      if (originFilter === "NEW"){
        if(!clicked) setClicked(true) 
        setOriginFilter("ALL");
      } 
    }
    return;
  };

  useEffect(() => {
    setPageIndex(1);
    const aux = cardState.slice((pageIndex - 1) * 8, pageIndex * 8);
    setVisiblePage(aux);
  }, [cardState]);

  useEffect(() => {
    const aux = cardState.slice((pageIndex - 1) * 8, pageIndex * 8);
    setVisiblePage(aux);
  }, [pageIndex]);

  return (
    <div className="CardContainer">
      <label htmlFor="search-bar">Search: </label>
      <SearchBar
        id="search-bar"
        state={state}
        setState={setCardState}
        order={order}
        origin={originFilter}
        type={type}
        temperamentFilter={temperamentFilter}
        clicked={clicked}
      />
      <label htmlFor="sort">Sort by:</label>
      <div id="sort">
        <label htmlFor="order">Order</label>
        <button name="order" id="order" value="ASC" onClick={handleButtonClick}>
          {order}
        </button>
        <button name="type" id="type" value="NAME" onClick={handleButtonClick}>
          {type}
        </button>
        <label htmlFor="type">Type</label>
      </div>
      <label htmlFor="filter">Filter by:</label>
      <div id="filter">
        <label htmlFor="origin">Origin</label>
        <button name="origin" id="origin" onClick={handleButtonClick}>
          {originFilter}
        </button>
        {temperament.length && (
          <select
            name="temperaments"
            id="temperaments"
            onChange={(e) =>{
                if(!clicked) setClicked(true)
                setTemperamentFilter(e.target.value)
            } }
          >
            <option></option>
            {temperament.map((item) => {
              return (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              );
            })}
          </select>
        )}
        <label htmlFor="temperaments">Temperament</label>
      </div>
      <div id="pages">
        <button name="prev" className="pageButton" onClick={handleButtonClick}>
          {"<<<"}
        </button>
        <button name="next" className="pageButton" onClick={handleButtonClick}>
          {">>>"}
        </button>
      </div>

      <ul className="card-grid">
        {visiblePage.length &&
          visiblePage.map((item) => {
            return <DogCard dog={item} key={item.id} />;
          })}
      </ul>
      <button name="prev" className="pageButton" onClick={handleButtonClick}>
        {"<<<"}
      </button>
      <button name="next" className="pageButton" onClick={handleButtonClick}>
        {">>>"}
      </button>
    </div>
  );
}

export default CardContainer;
