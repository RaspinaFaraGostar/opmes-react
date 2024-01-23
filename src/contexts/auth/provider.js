// React components and methods
import { useEffect, useMemo, useReducer, useState } from "react";

// React prop types
import PropTypes from "prop-types";

// Auth
import AuthContext from "./context";

// session storage hook
import { useSessionStorage } from "@uidotdev/usehooks";

// Axios 
import axios, { AxiosError } from "axios";

// Lodash methods
import map from "lodash/map";


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


    // Fetch auth info
    const fetchUserDetailsAsync = async () => {
        const responses = await axios.all([
            axios('api/MyAccount/GetMyAccountInfo').catch(() => null),
            axios('api/Permissions/PermissionWithRole').catch(() => null)
        ]);
        setUser(Object.assign({}, ...map(responses, response => response ? response.data : {})));
    }

    useEffect(() => {

        // Update local storage on state change
        setStorageState(controller);

        if (controller.access_token) {
            axios.defaults.headers.common['Authorization'] = 'bearer '.concat(controller.access_token);
            axios.interceptors.response.use(response => response, error => {
                if (error.response.status === 401) {
                    setStorageState(initialState);
                    return;
                }

                throw error;
            });
            fetchUserDetailsAsync();
        }
    }, [controller, dispatch])

    // Return null while proccecing the provider
    if (controller.access_token && !user) return null;

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthProvider;