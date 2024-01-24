// Proptype
import PropTypes from "prop-types";

// MUI components
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";

// Styled Component
const HelperText = styled(Typography)(({ theme }) => ({

    // spacing
    marginTop: theme.spacing(0.5),

    // line clamp
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: '1'
}));

const InputHelperText = ({ children, sx, ...props }) => {
    return (
        <HelperText {...props} variant="caption" sx={{ ...sx, ml: 1 }}>{children}</HelperText>
    )
}

InputHelperText.propTypes = {
    children: PropTypes.node,
    sx: PropTypes.object,
}

export default InputHelperText;