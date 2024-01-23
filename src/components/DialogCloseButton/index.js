
// Proptypes
import PropTypes from "prop-types";

// MUI components
import MuiIconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";

// Icons
import CloseIcon from "@mui/icons-material/Close";


const IconButton = styled(MuiIconButton)(({ theme }) => ({
    position: 'absolute',
    right: 8,
    top: 8,
    color: theme.palette.grey[500],
}))


function DialogCloseButton({ onClick }) {
    return (
        <IconButton
            aria-label="close"
            onClick={onClick}
        >
            <CloseIcon />
        </IconButton>
    )
}

// Typechecking props
DialogCloseButton.propTypes = {
    onClick: PropTypes.func,
};

export default DialogCloseButton;