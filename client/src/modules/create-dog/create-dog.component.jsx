import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTemperaments } from "../../store/actions";
import LinkButton from "../link-button/link-button.component";

function CreateDog() {
  const temperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();
  const urlRegEx = new RegExp(
    /(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/g
  );
  const hasSpecialCharRegEx = new RegExp(/[^a-zA-Z ]/);
  const history = useHistory();

  const [name, setName] = useState("");
  const [weight, setWeight] = useState([0, 0]);
  const [height, setHeight] = useState([0, 0]);
  const [image, setImage] = useState("");
  const [lifeSpan, setLifeSpan] = useState([0, 0]);
  const [temperamentState, setTemperamentState] = useState([]);

  const [submittable, setSubmittable] = useState(false);

  const [nameError, setNameError] = useState("");
  const [weightError, setWeightError] = useState("");
  const [heightError, setHeightError] = useState("");
  const [imageError, setImageError] = useState("");
  const [lifeSpanError, setLifeSpanError] = useState("");
  const [temperamentError, setTemperamentError] = useState("");

  useEffect(() => {
    if (temperaments.length < 1) {
      dispatch(getTemperaments());
    }
  }, []);

  const handleClick = (e) => {
    e.preventDefault();
    const aux = [...temperamentState];
    aux.splice(aux.indexOf(e.target.innerHTML), 1);
    setTemperamentState(aux);
  };

  const handleSubmit = async (e) => {
      try {
        e.preventDefault();
        if (
          !nameError &&
          !lifeSpanError &&
          !weightError &&
          !heightError &&
          !imageError &&
          !temperamentError &&
          submittable
        ) {
            const tempIDs = []
            for (let i = 0; i < temperaments.length; i++) {
                for (let j = 0; j < temperamentState.length; j++) {
                    if(temperaments[i].name === temperamentState[j]){
                        tempIDs.push(temperaments[i].id)
                    }  
                }  
            }
            const body = {
                name ,
                height : `${height[0]} - ${height[1]}` ,
                weight : `${weight[0]} - ${weight[1]}`,
                life_span : `${lifeSpan[0]} - ${lifeSpan[1]} years`,
                image ,
                temperament : tempIDs
            }
            
            const response = await axios.post("http://localhost:3001/dog", body)
          console.log( temperamentState , tempIDs )
          console.log("FORM ENVIADA WOHOO");
          console.log(response)
        }
      } catch (err) {
          console.log(err)
      }
    
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (!submittable) setSubmittable(true);
    const eventName = e.target.name;

    switch (eventName) {
      case "temperaments":
        if (
          !temperamentState.includes(e.target.value) &&
          e.target.value !== "Select"
        ) {
          setTemperamentState([...temperamentState, e.target.value]);
        }
        break;

      case "name":
        setName(e.target.value);
        break;

      case "weight0":
        const parsedWeight = Number.parseInt(e.target.value);
        if (parsedWeight && parsedWeight > 0 && parsedWeight <= 250) {
          setWeight([parsedWeight, weight[1]]);
        }
        if (parsedWeight && parsedWeight > 250) {
          setWeight([250, weight[1]]);
        }
        break;
      case "weight1":
        const parsedWeight2 = Number.parseInt(e.target.value);
        if (parsedWeight2 && parsedWeight2 > 0 && parsedWeight2 <= 250) {
          setWeight([weight[0], parsedWeight2]);
        }
        if (parsedWeight2 && parsedWeight2 > 250) {
          setWeight([weight[0], 250]);
        }
        break;

      case "height0":
        const parsedHeight = Number.parseInt(e.target.value);
        if (parsedHeight && parsedHeight > 0 && parsedHeight <= 250) {
          setHeight([parsedHeight, height[1]]);
        }
        if (parsedHeight && parsedHeight > 250) {
          setHeight([250, height[1]]);
        }
        break;
      case "height1":
        const parsedHeight2 = Number.parseInt(e.target.value);
        if (parsedHeight2 && parsedHeight2 > 0 && parsedHeight2 <= 250) {
          setHeight([height[0], parsedHeight2]);
        }
        if (parsedHeight2 && parsedHeight2 > 250) {
          setHeight([height[0], 250]);
        }
        break;

      case "lifeSpan0":
        const parsedLifeSpan = Number.parseInt(e.target.value);
        if (parsedLifeSpan && parsedLifeSpan > 0 && parsedLifeSpan <= 30) {
          setLifeSpan([parsedLifeSpan, lifeSpan[1]]);
        }
        if (parsedLifeSpan && parsedLifeSpan > 30) {
          setLifeSpan([30, lifeSpan[1]]);
        }
        break;
      case "lifeSpan1":
        const parsedLifeSpan2 = Number.parseInt(e.target.value);
        if (parsedLifeSpan2 && parsedLifeSpan2 > 0 && parsedLifeSpan2 <= 30) {
          setLifeSpan([lifeSpan[0], parsedLifeSpan2]);
        }
        if (parsedLifeSpan2 && parsedLifeSpan2 > 30) {
          setLifeSpan([lifeSpan[0], 30]);
        }
        break;

      case "image":
        setImage(e.target.value);
        break;

      default:
        break;
    }
  };

  const validate = () => {
    if (name.length < 3 || hasSpecialCharRegEx.test(name)) {
      setNameError(
        "At least 3 characters long with no numbers or special characters"
      );
    } else setNameError("");

    if (lifeSpan[0] === 0 || lifeSpan[1] === 0 || lifeSpan[0] > lifeSpan[1]) {
      setLifeSpanError(
        "Ranges should be from 1 to 30 and the second should be greater or equal than the first"
      );
    } else setLifeSpanError("");

    if (weight[0] === 0 || weight[1] === 0 || weight[0] > weight[1]) {
      setWeightError(
        "Ranges should be from 1 to 250 and the second should be greater or equal than the first"
      );
    } else setWeightError("");

    if (height[0] === 0 || height[1] === 0 || height[0] > height[1]) {
      setHeightError(
        "Ranges should be from 1 to 250 and the second should be greater or equal than the first"
      );
    } else setHeightError("");

    if (image === "" || !urlRegEx.test(image)) {
      setImageError("Field must not be empty and be a valid URL");
    } else setImageError("");

    if (temperamentState.length < 1) {
      setTemperamentError("Should have at least one temperament chosen");
    } else setTemperamentError("");

    //handleSubmit();
  };

  useEffect(() => {
    if (submittable) {
      validate();
    }
  }, [name, weight, height, image, lifeSpan, temperamentState]);

  return (
    <div className="CreateDog">
      <LinkButton
        className="create-dog link-button"
        route={"/dogs"}
        value={"Volver"}
      />
      <h1>Add a new Breed</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Type the name</label>
          <input
            name="name"
            id="name"
            type="text"
            value={name}
            onChange={handleChange}
          />

          <label htmlFor="weight">Type the weight</label>
          <div id="weight">
            <input
              name="weight0"
              type="number"
              min="0"
              step="1"
              value={weight[0]}
              onChange={handleChange}
            />
            <span> to </span>
            <input
              name="weight1"
              type="number"
              min="0"
              step="1"
              value={weight[1]}
              onChange={handleChange}
            />
            <span> kgs. </span>
          </div>

          <label htmlFor="height">Type the height</label>
          <div id="height">
            <input
              name="height0"
              type="number"
              min="0"
              step="1"
              value={height[0]}
              onChange={handleChange}
            />
            <span> to </span>
            <input
              name="height1"
              type="number"
              min="0"
              step="1"
              value={height[1]}
              onChange={handleChange}
            />
            <span> cms. </span>
          </div>

          <label htmlFor="lifeSpan">Choose the life span range</label>
          <div id="lifeSpan">
            <input
              name="lifeSpan0"
              type="number"
              min="0"
              step="1"
              value={lifeSpan[0]}
              onChange={handleChange}
            />
            <span> to </span>
            <input
              name="lifeSpan1"
              type="number"
              min="0"
              max="30"
              step="1"
              value={lifeSpan[1]}
              onChange={handleChange}
            />
            <span> years </span>
          </div>

          <label htmlFor="image">Type the image URL</label>
          <input
            name="image"
            id="image"
            type="text"
            value={image}
            onChange={handleChange}
          />

          <label htmlFor="temperaments">Choose the temperaments</label>
          {temperaments.length && (
            <select
              name="temperaments"
              id="temperaments"
              onChange={handleChange}
            >
              <option>Select</option>
              {temperaments.map((item) => {
                return (
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          )}

          <input type="submit" value="Submit" />
        </form>
      </div>

      <div className="temperaments-container">
        <h3>Temperament list</h3>
        <div>
          {temperamentState.length > 0 &&
            temperamentState.map((item, index) => {
              return (
                <p key={index} onClick={handleClick}>
                  {item}
                </p>
              );
            })}
        </div>
      </div>
      <img
        src="https://happydogclipsandkennels.files.wordpress.com/2019/08/happy-dog-country-clips-and-kennels-happy-dog-photos-1.png"
        alt="happy dog"
      />
    </div>
  );
}

export default CreateDog;
