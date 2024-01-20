import PropTypes from "prop-types";

import AuthContext from "./context";
import { useMemo, useReducer } from "react";


function reducer(state, action) {
    switch (action.type) {
        case "LOGIN": {
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
    const initialState = {
        user: null,
    };

    const [controller, dispatch] = useReducer(reducer, initialState);

    const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;