import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LinkButton from "../link-button/link-button.component";
import CardContainer from "../card-container/card-container.component";
import { getTemperaments, getDogs } from "../../store/actions";
import Footer from "../footer/footer.component";

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


  // HACER UN CONTAINER PARA EL SEARCHBOX Y EL LAS CARDS JUNTO CON EL ESTADO, PASARLE EL ESTADO DE REDUX COMO PROPS

  

  return (
    <div className="Home">
      <LinkButton route="/dogs/create" value="Agregar una nueva Raza" />
      <h1>SOY HOME</h1>
      {dogs.length > 1 && <CardContainer state={dogs}/>}
      {/* <CardContainer state={dogs}/> */}
      {/* <SearchBar state={localState} setState={setLocalState} /> */}
      {/* <CardContainer/> */}
      <Footer/>
    </div>
  );
}

export default Home;
