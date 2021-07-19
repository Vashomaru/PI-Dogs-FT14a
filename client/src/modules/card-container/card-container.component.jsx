import { useState , useEffect } from 'react'
import SearchBar from "../search-bar/search-bar.component"
import DogCard from '../dog-card/dog-card.component'

function CardContainer(props){
    const { state } = props
    const initialVisible = state.slice(0,8)
    const [cardState , setCardState] = useState(state)
    const [visiblePage , setVisiblePage] = useState(initialVisible)
    const [pageIndex , setPageIndex] = useState(1)
    // CREAR ESTADO PARA EL ORDEN Y CREADOS, HACER BOTONES COMPONENTES

    const handleButtonClick = (e)=>{
        e.preventDefault()
        console.log(cardState.length , cardState.length / (pageIndex * 8))
        if(e.target.name === "next" && (cardState.length / (pageIndex * 8)) > 1) setPageIndex(pageIndex + 1)
        if(e.target.name === "prev" && pageIndex > 1) setPageIndex(pageIndex - 1)
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
            <SearchBar state={state} setState={setCardState}/>
            <button name="prev" className="pageButton" onClick={handleButtonClick}>{"<<<"}</button>
            <button name="next" className="pageButton" onClick={handleButtonClick}>{">>>"}</button>
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