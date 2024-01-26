// React components and methods
import { useEffect, useMemo, useReducer, useState } from "react";

// React prop types
import PropTypes from "prop-types";

// Auth
import AuthContext from "./context";

// session storage hook
import { useSessionStorage } from "@uidotdev/usehooks";

// Axios 
import axios from "axios";

// Lodash methods
import every from "lodash/every";
import map from "lodash/map";


// Initial state
const initialState = {
    access_token: '',
    refresh_token: '',
    expires_in: 0
}

// Reducer
function reducer(state, action) {
    switch (action.type) {
        case "REVOKE_TOKEN": {
            return { ...state, ...action.value };
        }
        case "USER_DETAILS": {
            return { ...state, user: action.value };
        }
        case "LOGOUT": {
            return initialState;
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

const AuthProvider = ({ children }) => {

    // Browser storage state
    const [storageState, setStorageState] = useSessionStorage("AUTH", initialState);

    // Defined auth reducer and dispatcher
    const [controller, dispatch] = useReducer(reducer, storageState);

    // Authenticated user
    const [user, setUser] = useState(null);

    // Fetch auth info
    const fetchUserDetailsAsync = async () => {
        const responses = await axios.all([
            axios('api/MyAccount/GetMyAccountInfo').catch(() => null),
            axios('api/Permissions/PermissionWithRole').catch(() => null)
        ]);
        setUser(Object.assign({}, ...map(responses, response => response ? response.data : {})));
    }

    const resetRole = () => setUser({ ...user, RoleCode: null });
    const logout = () => dispatch({ type: "LOGOUT" });

    // Get provider value
    const value = useMemo(() => [{ ...controller, user }, dispatch, { logout, resetRole }], [user, controller, dispatch]);

    useEffect(() => {

        // Update local storage on state change
        setStorageState(every(Object.keys(controller), key => !Boolean(controller[key])) ? undefined : controller);

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
        } else {
            axios.defaults.headers.common['Authorization'] = undefined;
            setUser(null);
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