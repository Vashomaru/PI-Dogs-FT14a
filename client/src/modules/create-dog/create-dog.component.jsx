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
  const hasSpecialCharRegEx = new RegExp(/[^a-zA-Z]/)
  const history = useHistory();

  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [image, setImage] = useState("");
  const [lifeSpan, setLifeSpan] = useState([0,0]);
  const [temperamentState, setTemperamentState] = useState([]);

  const [errors, setErrors] = useState({
      nameError : "" ,
      weightError : "" ,
      heightError : "" ,
      imageError : "" ,
      lifeSpanError : "" ,
      temperamentError : "" 
  })

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

  const handleSubmit = () => {};

  const handleChange = (e) => {
    e.preventDefault();
    const eventName = e.target.name;
    console.log(eventName, e.target.value);

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

      case "weight":
        setWeight(e.target.value);
        break;

      case "height":
        setHeight(e.target.value);
        break;

      case "lifeSpan0":
          const parsed = Number.parseInt(e.target.value)
          if(parsed && parsed > 0 && parsed <= 30){
            setLifeSpan([parsed, lifeSpan[1]]);
          }
          if(parsed && parsed > 30){
            setLifeSpan([30, lifeSpan[1]]);
          }
        break;
    case "lifeSpan1":
          const parsed2 = Number.parseInt(e.target.value)
          if(parsed2 && parsed2 > 0 && parsed2 <= 30){
            setLifeSpan([lifeSpan[0] , parsed2]);
          }
          if(parsed2 && parsed2 > 30){
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

  const validate = () =>{
    if(name.length < 3 || hasSpecialCharRegEx.test(name)){
        setErrors({...errors, nameError:"At least 3 characters long with no numbers or special characters"})
    }
    if((lifeSpan[0] === 0 || lifeSpan[1] === 0) || lifeSpan[0] > lifeSpan[1]){
        setErrors({...errors, lifeSpanError:"Ranges should be from 1 to 30 and the second should be greater or equal than the first"})
    }
  }

  return (
    <div className="CreateDog">
      <LinkButton className="create-dog link-button" route={"/dogs"} value={"Volver"} />
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
          <input
            name="weight"
            id="weight"
            type="text"
            value={weight}
            onChange={handleChange}
          />
          <label htmlFor="height">Type the height</label>
          <input
            name="height"
            id="height"
            type="text"
            value={height}
            onChange={handleChange}
          />
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
            <input
                name="lifeSpan1"
                type="number"
                min="0"
                max="30"
                step="1"
                value={lifeSpan[1]}
                onChange={handleChange}
            />
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
      <img src="https://happydogclipsandkennels.files.wordpress.com/2019/08/happy-dog-country-clips-and-kennels-happy-dog-photos-1.png" alt="happy dog" />
    </div>
  );
}

export default CreateDog;
