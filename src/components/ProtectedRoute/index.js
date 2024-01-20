import { Navigate } from 'react-router-dom';

import PropTypes from "prop-types";

import { useAuth } from 'contexts/auth';

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute