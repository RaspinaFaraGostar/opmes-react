import PropTypes from "prop-types";

import AuthContext from "./context";
import { useEffect, useMemo, useReducer, useState } from "react";
import { useSessionStorage } from "@uidotdev/usehooks";
import axios from "axios";


function reducer(state, action) {
    switch (action.type) {
        case "REVOKE_TOKEN": {
            return { ...state, ...action.value };
        }
        case "USER_DETAILS": {
            return { ...state, user: action.value };
        }
        case "LOGOUT": {
            return { ...state, user: null };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const initialState = {
        access_token: '',
        refresh_token: '',
        expires_in: 0
    }

    const [storageState, setStorageState] = useSessionStorage("AUTH", initialState);

    const [controller, dispatch] = useReducer(reducer, storageState);

    const value = useMemo(() => [{ ...controller, user }, dispatch], [user, controller, dispatch]);


    const fetchAccountInfo = async () => {
        const response = await axios('api/MyAccount/GetMyAccountInfo');
        console.log('fethching...', response);
        setUser(response.data);
    }

    useEffect(() => {

        // Update local storage on state change
        setStorageState(controller);

        if (controller.access_token) {
            axios.defaults.headers.common['Authorization'] = 'bearer '.concat(controller.access_token);
            fetchAccountInfo();
        }
    }, [controller, dispatch])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;