import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./types";
import axios from "axios"
import {returnErrors} from "./messages";


export const loadUser = () => (dispath, getState) => {
    const config = tokenConfig(getState);
    axios.get("/api/auth/user", config)
        .then(res => {
            dispath({
                type: USER_LOADED,
                payload: res.data
            })
        })
        .catch(err => {
            dispath(returnErrors(err.response.data, err.response.status));
            dispath({
                type: AUTH_ERROR
            })
        })
};

export const login = (username, password) => dispath => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify({username, password});
    axios.post("/api/auth/login", body, config)
        .then(res => {
            dispath({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispath(returnErrors(err.response.data, err.response.status));
            dispath({
                type: LOGIN_FAIL
            })
        })
};

export const logout = () => (dispath, getState) => {
    const config = tokenConfig(getState);
    axios.post("/api/auth/logout", null, config)
        .then(res => {
            dispath({
                type: LOGOUT_SUCCESS
            })
        })
        .catch(err => {
            dispath(returnErrors(err.response.data, err.response.status))
        })
};

export const tokenConfig = getState => {
    const token = getState().auth.token;
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    if (token) {
        config.headers["Authorization"] = `Token ${token}`;
    }
    return config
};


export const register = ({username, password, email}) => dispath => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };
    const body = JSON.stringify({username, password, email});
    axios.post("/api/auth/register", body, config)
        .then(res => {
            dispath({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispath(returnErrors(err.response.data, err.response.status));
            dispath({
                type: REGISTER_FAIL
            })
        })
};