// Proptype
import PropTypes from "prop-types";

// MUI components
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";

// Styled Component
const LabelTypography = styled(Typography)(({ theme }) => ({
    // spacing
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(0.5),

    // layout
    display: "inline-flex",
    alignItems: "center",

    // line clamp
    overflow: "hidden",
    lineHeight: 1.1,
    // display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: "1",

    "& .MuiIcon-root, & .MuiSvgIcon-root": {
        marginRight: theme.spacing(0.25),
    },
}));

const SoftInputLabel = ({ children, ...props }) => {
    return (
        <LabelTypography
            component="label"
            variant="caption"
            fontWeight="bold"
            textTransform="capitalize"
            {...props}
        >
            {children}
        </LabelTypography >
    );
};

SoftInputLabel.propTypes = {
    children: PropTypes.node,
    sx: PropTypes.object,
};

export default SoftInputLabel;
