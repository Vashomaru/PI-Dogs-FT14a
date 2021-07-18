import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LinkButton from "../link-button/link-button.component";
import SearchBar from "../search-bar/search-bar.component";
//import CardContainer from '../cardContainer';
import { getTemperaments, getDogs } from "../../store/actions";

function Home() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const dogs = useSelector((state) => state.dogList);

  useEffect(() => {
    if (temperaments.length < 1) {
      dispatch(getTemperaments());
    }
    if (dogs.length < 1) {
      dispatch(getDogs());
    }
  }, []);

  if(dogs.length < 1){
      
  }
  // HACER UN CONTAINER PARA EL SEARCHBOX Y EL LAS CARDS JUNTO CON EL ESTADO, PASARLE EL ESTADO DE REDUX COMO PROPS

  const [localState, setLocalState] = useState(dogs);

  return (
    <div className="Home">
      <LinkButton route="/dogs/create" value="Agregar una nueva Raza" />
      <h1>SOY HOME</h1>
      {/* <SearchBar state={localState} setState={setLocalState} /> */}
      {/* <CardContainer/> */}
    </div>
  );
}

export default Home;
