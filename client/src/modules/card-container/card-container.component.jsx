import { useState , useEffect } from 'react'
import SearchBar from "../search-bar/search-bar.component"
import DogCard from '../dog-card/dog-card.component'

function CardContainer(props){
    const { state , temperament } = props
    const initialVisible = state.slice(0,8)
    const [cardState , setCardState] = useState(state)
    const [visiblePage , setVisiblePage] = useState(initialVisible)
    const [pageIndex , setPageIndex] = useState(1)
    const [order , setOrder] = useState("ASC")
    const [type, setType] = useState("NAME")
    const [temperamentFilter , setTemperamentFilter] = useState("")
    const [originFilter , setOriginFilter] = useState("ALL")


    const handleButtonClick = (e)=>{
        e.preventDefault()
        if(e.target.name === "next" && (cardState.length / (pageIndex * 8)) > 1) setPageIndex(pageIndex + 1)
        if(e.target.name === "prev" && pageIndex > 1) setPageIndex(pageIndex - 1)
        if(e.target.name === "order"){
            if(e.target.value === "ASC") setOrder("DESC")
            if(e.target.value === "DESC") setOrder("ASC")
        }
        return

    }

    useEffect(() => {
        setPageIndex(1)
        const aux = cardState.slice((pageIndex -1) * 8 , (pageIndex * 8))
        setVisiblePage(aux)
      }, [cardState]);

    useEffect(() => {
        const aux = cardState.slice((pageIndex -1) * 8 , (pageIndex * 8))
        setVisiblePage(aux)
      }, [pageIndex]);

    


    return(
        <div className="CardContainer">
            <label htmlFor="search-bar">Search: </label>
            <SearchBar id="search-bar" state={state} setState={setCardState}/>
            <label htmlFor="sort">Sort by:</label>
            <div id="sort">
            <button name="order" onClick={handleButtonClick}>{order}</button>
            <button name="type" onClick={handleButtonClick}>{type}</button>
            </div>
            <label htmlFor="filter">Filter by</label>
            <div id="filter">
            <button name="origen" onClick={handleButtonClick}>ALL</button>
            {temperament.length && (
            <select
              name="temperaments"
              id="temperaments"
              onChange={e => setTemperamentFilter(e.target.value)}
            >
              <option>Select</option>
              {temperament.map((item) => {
                return (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          )}

            </div>
            <div id="pages">
            <button name="prev" className="pageButton" onClick={handleButtonClick}>{"<<<"}</button>
            <button name="next" className="pageButton" onClick={handleButtonClick}>{">>>"}</button>
            </div>
            
            <ul className="card-grid">
                {visiblePage.length && visiblePage.map(item=>{
                return <DogCard dog={item}
                                key={item.id}/>
                })}
            </ul>
            <button name="prev" className="pageButton" onClick={handleButtonClick}>{"<<<"}</button>
            <button name="next" className="pageButton" onClick={handleButtonClick}>{">>>"}</button>

        </div>
    )
}

export default CardContainer