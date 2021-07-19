import { useHistory } from "react-router-dom";

function DogCard(props){
    let history = useHistory();
    const {name , image , id , weight , created , temperaments} = props.dog

    function handleClick() {
        history.push(`/dogs/${id}`);
      }

    const tempArray = []

    for (let i = 0; i < temperaments.length; i++) {
        tempArray.push(temperaments[i].name)
        
    }

    const tempString = tempArray.join(", ")


    return(
        <div className="DogCard" onClick={handleClick}>
            <li>
                <h1>{name}</h1>
                <img src={image} alt={`${name} dog`} />
                <h2>{`${weight} Kg`}</h2>
                <h2>Temperaments: </h2><br />
                <p>{tempString}</p>
            </li>
        </div>
    )

}

export default DogCard;