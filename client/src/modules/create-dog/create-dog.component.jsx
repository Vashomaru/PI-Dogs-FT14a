import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getTemperaments } from "../../store/actions";

function CreateDog() {
  const temperaments = useSelector((state) => state.temperaments);
  const dispatch = useDispatch();
  const urlRegEx = new RegExp(
    /(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/g
  );
  const history = useHistory();

  useEffect(() => {
    if (temperaments.length < 1) {
      dispatch(getTemperaments());
    }
  }, []);

  return (
    <div className="CreateGame">
      <h1>SOY CREATEGAME</h1>
    </div>
  );
}

export default CreateDog;
