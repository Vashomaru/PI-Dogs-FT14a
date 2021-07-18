import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDogDetail } from "../../store/actions";

function DogDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const detail = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDogDetail(id));
  }, []);

  return (
    <div className="Detail">
        <h1>Soy Detail</h1>
        <h2>{detail.name}</h2>
      {/* {detail.error ? <div>{detail.error}</div> :
      <GameCardBig
      name={detail.name}
      image={detail.background_image}
      genres={detail.genres}
      description={detail.description_raw}
      release={detail.released}
      rating={detail.rating}
      platforms={detail.platforms}
      id={detail.id}
    /> } */}
      
    </div>
  );
}

export default DogDetail;