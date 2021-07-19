import { useState } from 'react'
import SearchBar from "../search-bar/search-bar.component"

function CardContainer(props){
    const { state } = props
    const [cardState , setCardState] = useState(state)


    return(
        <div className="CardContainer">
            <SearchBar state={state} setState={setCardState}/>

        </div>
    )
}

export default CardContainer