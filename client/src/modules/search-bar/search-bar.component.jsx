import { useState , useEffect } from 'react'

function SearchBar(props){
    const { state , setState } = props
    const stateToFilter = [...state]
    const [searchBarState, setSearchBarState] = useState("")

    const handleChange = (e)=>{
        e.preventDefault()
        setSearchBarState(e.target.value)
    }

    useEffect(()=>{
        if(searchBarState !== ""){
            const filteredState = stateToFilter.filter(item =>{
                //console.log("ESTO ES ITEM NAME ", item.name , "ESTO ES TARGET VALUE ", e.target.value)
                return item.name.toLowerCase().includes(searchBarState.toLowerCase())
            })
            console.log("ESTO ES FILTERED STATE",filteredState)
            setState(filteredState)
        }
        
    },[searchBarState])


    return(
        <div className="SearchBar">
            <input type="search" value={searchBarState} onChange={handleChange}></input>
        </div>
    )

}

export default SearchBar;