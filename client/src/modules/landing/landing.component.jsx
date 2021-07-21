import { useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import { getTemperaments, getDogs } from "../../store/actions";
import LinkButton from "../link-button/link-button.component";

function Landing() {
  const dispatch = useDispatch();
  const temperaments = useSelector((state) => state.temperaments);
  //const dogs = useSelector((state) => state.dogList);
  useEffect(() => {
    dispatch(getTemperaments());
  }, []);

  useEffect(()=>{
      if(temperaments.length > 0) dispatch(getDogs());
  }, [temperaments])

  return (
    <div className="Landing">
        <div className="Img-Container">
            <h1>Welcome to Henry Dogs</h1>
            <LinkButton route="/dogs" value="Entrar al sitio" />
        </div>      
    </div>
  );
}

export default Landing;
