/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Fade from "@mui/material/Fade";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";

// Custom styles for the SoftSnackbar
import SoftSnackbarContent from "./SoftSnackbarContent";

function SoftSnackbar({ close, ...props }) {

  return (
    <Snackbar
      TransitionComponent={Fade}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      action={close && (
        <IconButton size="small" aria-label="close" color="inherit" onClick={close}>
          <Icon fontSize="small">close</Icon>
        </IconButton>
      )}
    >
      <SoftSnackbarContent {...props} />
    </Snackbar>
  );
}

// Setting default values for the props of SoftSnackbar
SoftSnackbar.defaultProps = {
  bgWhite: false,
  color: "info",
};

// Typechecking props for SoftSnackbar
SoftSnackbar.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error",
    "dark",
    "light",
  ]),
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  content: PropTypes.node.isRequired,
  close: PropTypes.func.isRequired,
  bgWhite: PropTypes.bool,
};

export default SoftSnackbar;
