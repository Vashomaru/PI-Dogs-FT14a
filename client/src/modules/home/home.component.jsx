import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import LinkButton from "../link-button/link-button.component";
import CardContainer from "../card-container/card-container.component";
import { getTemperaments, getDogs } from "../../store/actions";
import Footer from "../footer/footer.component";
import Header from "../header/header.component";

function Home() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  const dogs = useSelector((state) => state.dogList);

  useEffect(() => {
    if(temperaments.length < 1) dispatch(getTemperaments());
    
  }, []);

  useEffect(() => {
    if (dogs.length < 1 && temperaments.length > 0) {
      dispatch(getDogs());
    }
  }, [temperaments, dogs]);

  

  return (
    <div className="Home">
      <Header/>  
      <LinkButton route="/dogs/create" value="Add a new breed" />
      {dogs.length > 1 && <CardContainer state={dogs} temperament={temperaments}/>}
      <Footer/>
    </div>
  );
}

export default Home;
