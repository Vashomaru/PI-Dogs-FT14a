import { useHistory } from "react-router-dom";

function LinkButton(props) {
    let history = useHistory();
    const { route , value } = props
  
    function handleClick() {
      history.push(route);
    }
  
    return (
      <button type="button" onClick={handleClick}>
        {value}
      </button>
    );
  }

export default LinkButton;