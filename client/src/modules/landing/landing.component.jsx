import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getTemperaments, getDogs } from "../../store/actions";
import LinkButton from "../link-button/link-button.component";

function Landing() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTemperaments());
    dispatch(getDogs());
  }, []);

  return (
    <div className="Landing">
        <div className="Img-Container">
            <h1>SOY LANDING</h1>
            <LinkButton route="/dogs" value="Entrar al sitio" />
        </div>      
    </div>
  );
}

export default Landing;
