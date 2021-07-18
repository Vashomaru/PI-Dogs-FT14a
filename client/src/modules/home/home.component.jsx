import { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import LinkButton from '../link-button/link-button.component';
//import SearchBar from '../searchBar';
//import CardContainer from '../cardContainer';
import { getTemperaments, getDogs } from "../../store/actions";

function Home() {
  const dispatch = useDispatch()
  const temperaments = useSelector(state => state.temperaments)
  const dogs = useSelector(state => state.dogList)

  useEffect(()=>{
    if(temperaments.length < 1){
      dispatch(getTemperaments())
    }
    if(dogs.length < 1){
      dispatch(getDogs())
    }},[])

  
    return (
      <div className="Home">
        <LinkButton route="/dogs/create" value="Agregar una nueva Raza"/>
        <h1>SOY HOME</h1>
        {/* <SearchBar/>
        <CardContainer/> */}
      </div>
    );
  }
  
  export default Home;