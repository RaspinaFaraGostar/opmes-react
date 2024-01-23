// React Router Dom components
import { Navigate, useLocation } from 'react-router-dom';

// Proptypes for compoent props validation
import PropTypes from "prop-types";

// Authentication
import { useAuth } from 'contexts/auth';

const ProtectedRoute = ({ children }) => {
    const [controller] = useAuth();
    const location = useLocation();

    // Navigate to login screen if no user has been provided
    if (!controller.user) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    // Navigate to select role page if no role has been set for current user
    if (!controller.user.RoleCode) {
        return <Navigate to="/select-role" replace state={{ from: location }} />;
    }

    // Render component otherwise
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node,
};

export default ProtectedRoute