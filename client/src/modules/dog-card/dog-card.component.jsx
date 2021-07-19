
function DogCard(props){
    const {name , image , id , weight , created , temperaments} = props.dog


    return(
        <div className="DogCard">
            <li>
                <h1>{name}</h1>
                <img src={image} alt={`${name} dog`} />
                <h2>{`${weight} Kg`}</h2>
            </li>
        </div>
    )

}

export default DogCard;