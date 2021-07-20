import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDogDetail } from "../../store/actions";
import LinkButton from "../link-button/link-button.component";
import Header from "../header/header.component";
import Footer from "../footer/footer.component";

function DogDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDogDetail(id));
  }, []);


  return (
    <div className="Detail">
      <Header/>
      <LinkButton route={"/dogs"} value={"Volver"} />
      <h1>{detail.name}</h1>
      <h2>{`Life Span: ${detail.life_span}`}</h2>
      <h2>{`Weight: ${detail.weight}`}</h2>
      <h2>{`Height: ${detail.height}`}</h2>
      <div>
        <img src={detail.image} alt={`${detail.name} dog`} />
        <ul className="container">
          {detail.temperaments !== undefined &&
            detail.temperaments.map((item, index) => {
              return (
                <li key={index}>
                  <p>{item.name}</p>
                </li>
              );
            })}
        </ul>
      </div>
      <Footer/>
    </div>
  );
}

export default DogDetail;
