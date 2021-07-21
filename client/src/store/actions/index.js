import axios from "axios";

export function getDogs(dogName) {
  return async function (dispatch) {
    try {
      if (dogName) {
        const dogList = await axios.get(
          `http://localhost:3001/dogs?name=${dogName}`
        );
        return dispatch({
          type: "GET_DOGS",
          payload: dogList.data,
        });
      } else {
        const dogList = await axios.get(`http://localhost:3001/dogs`);
        return dispatch({
          type: "GET_DOGS",
          payload: dogList.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export function getTemperaments() {
  return async function (dispatch) {
    try {
      const temperamentList = await axios.get("http://localhost:3001/temperament");
      return dispatch({
        type: "GET_TEMPERAMENTS",
        payload: temperamentList.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getDogDetail(id) {
  return async function (dispatch) {
    try {
      if (id) {
        const dogDetail = await axios.get(
          `http://localhost:3001/dogs/${id}`
        );
        
        if (typeof dogDetail.data === "string") {
          return dispatch({
            type: "NULL_DETAIL",
            payload: dogDetail.data,
          });
        } else {
          return dispatch({
            type: "GET_DETAIL",
            payload: dogDetail.data,
          });
        }
      } else return;
    } catch (err) {
      console.log(err);
    }
  };
}

export function refreshDogList() {
  return async function (dispatch) {
    try {
      const dogList = await axios.get(`http://localhost:3001/dogs`);
        return dispatch({
          type: "REFRESH_DOGLIST",
          payload: dogList.data,
        });  
    } catch (err) {
      console.log(err);
    }
  };
}

