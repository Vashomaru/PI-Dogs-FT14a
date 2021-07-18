
function SearchBar(props){
    const { state , setState } = props
    console.log("holis")

    const handleChange = (e)=>{
        e.preventDefault()
        if(e.target.value !== ""){
            const filteredState = state.filter(item =>{
                return item.name.toLowerCase().includes(e.target.value.toLowerCase)
            })
    
            setState(filteredState)
        }
    }

    return(
        <div className="SearchBar">
            <input type="search" onChange={handleChange}></input>
        </div>
    )

}

export default SearchBar;