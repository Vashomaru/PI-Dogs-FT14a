import { useState , useEffect } from 'react'

function SearchBar(props){
    const { state , setState , origin , type , order , temperamentFilter , clicked } = props
    const stateToFilter = [...state]
    const [searchBarState, setSearchBarState] = useState("")
    

    const handleChange = (e)=>{
        e.preventDefault()
        setSearchBarState(e.target.value)
    }

    const sortBy = (order , type , array )=>{
        const aux = [...array]
        if( order === "ASC"){
            if (type === "NAME"){
                aux.sort(function (a,b){
                    let nameA = a.name.toUpperCase()
                    let nameB = b.name.toUpperCase()

                    if (nameA < nameB) {
                        return -1;
                      }
                      if (nameA > nameB) {
                        return 1;
                      }
                      return 0;
                })
            }
            else if(type === "WEIGHT"){
                aux.sort(function (a,b){
                    let weightA = Number.parseInt([a.weight.split(" ")][0])
                    let weightB = Number.parseInt([b.weight.split(" ")][0])
                    if (!weightA && weightA !== 0) weightA = 250
                    if (!weightB && weightB !== 0) weightA = 250 
                    return weightA - weightB;
                })
            }
        }
        if( order === "DESC"){
            if (type === "NAME"){
                aux.sort(function (a,b){
                    let nameA = a.name.toUpperCase()
                    let nameB = b.name.toUpperCase()

                    if (nameA > nameB) {
                        return -1;
                      }
                      if (nameA < nameB) {
                        return 1;
                      }
                      return 0;
                })
            }
            else if(type === "WEIGHT"){
                aux.sort(function (a,b){
                    let weightA = Number.parseInt([a.weight.split(" ")][0])
                    let weightB = Number.parseInt([b.weight.split(" ")][0])
                    if (!weightA && weightA !== 0) weightA = 250
                    if (!weightB && weightB !== 0) weightA = 250 
                    return weightB - weightA;
                })
            }
        }
        return aux
    }


    const filterBy = ( origin , temperament , sorted) =>{
        const aux = sorted.filter(item=>{
            let aux2
            if(origin === "ALL"){
                aux2 = true
            }
            if(origin === "NEW"){
                if(item.created === true) aux2 = true
            }
            if(origin === "OLD"){
                if(item.created === false) aux2 = true
            }
            return aux2
        })
        
        
        if(temperament !== ""){
            const filtered = []
            for (let i = 0; i < aux.length; i++) {
                for (let j = 0; j < aux[i].temperaments.length; j++) {
                    if(aux[i].temperaments[j].name === temperament){
                        filtered.push(aux[i])
                    }
                    
                }
                
            }
            return filtered
        }else return aux
        
    }

    useEffect(()=>{
        if(searchBarState !== "" || clicked){
            const filteredState = stateToFilter.filter(item =>{
                //console.log("ESTO ES ITEM NAME ", item.name , "ESTO ES TARGET VALUE ", e.target.value)


                return item.name.toLowerCase().includes(searchBarState.toLowerCase())
            })

            const sorted = sortBy(order , type , filteredState)

            const superFiltered = filterBy(origin , temperamentFilter ,sorted)

            setState(superFiltered)
        }
        
    },[searchBarState, origin , type , order , temperamentFilter])


    return(
        <div className="SearchBar">
            <input type="search" value={searchBarState} onChange={handleChange}></input>
        </div>
    )

}

export default SearchBar;