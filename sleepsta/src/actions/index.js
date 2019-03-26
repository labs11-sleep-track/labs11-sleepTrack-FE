import Axios from "axios";

export const REGISTER_USER = "REGISTER_USER";
export const USER_REGISTERED = "USER_REGISTERED";
export const LOGIN_USER_START = "LOGIN_USER_START";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";

export const UPDATE_USER = "UPDATE_USER";
export const USER_UPDATED = "USER_UPDATED";

export const FETCHING_USER = "FETCHING_USER";
export const USER_FETCHED = "USER_FETCHED";

export const registerUser = newUser => dispatch => {
  console.log("Registering");
  dispatch({ type: REGISTER_USER });
  Axios.post("https://sleepsta.herokuapp.com/api/register/", newUser)
    .then(res => {
      dispatch({ type: USER_REGISTERED, payload: res.data });
      console.log(res);
    })
    .catch(err => console.log(err.response));
};

export const updateUser = dispatch => {
  console.log("Updating");
  dispatch({ type: UPDATE_USER });
  Axios.put(
    `https://sleepsta.herokuapp.com/api/users/${localStorage.getItem("id")}`,
    {
      headers: { Authorization: localStorage.getItem("jwt") }
    }
  )
    .then(res => {
      dispatch({ type: USER_UPDATED, payload: res.data });
      console.log(res);
    })
    .catch(err => console.log(err.response));
};

export const loginUser = user => dispatch => {
  console.log("logging in");
  dispatch({ type: LOGIN_USER_START });
  Axios.post("https://sleepsta.herokuapp.com/api/login/", user)
    .then(res => {
      localStorage.setItem("jwt", res.data.token);
      localStorage.setItem("id", res.data.user.id);
      console.log("res", res);
      dispatch({ type: LOGIN_USER_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: LOGIN_USER_FAILURE, payload: err });
    });
};

export const getUser = () => dispatch => {
  console.log("Fetching");
  dispatch({ type: FETCHING_USER });
  Axios.get(
    `https://sleepsta.herokuapp.com/api/users/${localStorage.getItem("id")}`,
    {
      headers: {
        Authorization: localStorage.getItem("jwt")
      }
    }
  )
    .then(res => {
      dispatch({ type: USER_FETCHED, payload: res.data });
      console.log(res);
    })
    .catch(err => console.log(err));
};
