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
  const history = useHistory();

  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [image, setImage] = useState("");
  const [lifeSpan, setLifeSpan] = useState("");
  const [temperament, setTemperament] = useState([]);

  useEffect(() => {
    if (temperaments.length < 1) {
      dispatch(getTemperaments());
    }
  }, []);

  const temperamentsArray = [];

  const handleSubmit = () => {};

  const handleChange = (e) => {
    e.preventDefault()
    const eventName = e.target.name;
    console.log(eventName, e.target.value)

    switch (eventName) {
      case "temperaments":
          if(!temperamentsArray.includes(e.target.value)){
            temperamentsArray.push(e.target.value);
            console.log(temperamentsArray)
          } 
        
        break;

      case "name":
          setName(e.target.value)
          break
      
      case "weight":
          setWeight(e.target.value)
          break 
          
      case "height":
          setHeight(e.target.value)
          break  
         
      case "lifeSpan":
          setLifeSpan(e.target.value)
          break    

      case "image":
          setImage(e.target.value)
          break    

      default:
        break;
    }
  };

  

  return (
    <div className="CreateGame">
      <LinkButton route={"/dogs"} value={"Volver"} />
      <h1>Add a new Breed</h1>
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
        <label htmlFor="lifeSpan">Type the Life Span</label>
        <input
          name="lifeSpan"
          id="lifeSpan"
          type="text"
          value={lifeSpan}
          onChange={handleChange}
        />
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
          <select name="temperaments" id="temperaments" onChange={handleChange}>
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
      <ul>
        {temperamentsArray.map((item, index) =>{
            return <li key={index}>{item}</li>
        })}
      </ul>
    </div>
  );
}

export default CreateDog;
