/* eslint-disable react/prop-types */

// React components
import { forwardRef } from "react";

// MUI components
import { Fade } from "@mui/material";

// Typechecking
import PropTypes from "prop-types";

// Notistack components
import { SnackbarProvider as NotistackbarProvider, SnackbarContent } from "notistack";

// SoftUI components
import SoftSnackbarContent from "components/SoftSnackbar/SoftSnackbarContent";


const SoftSnackbar = forwardRef(
    ({ message, ...props }, ref) => {
        return (
            <SoftSnackbarContent ref={ref} title={message} {...props} />
        )
    }
)

const SnackbarProvider = ({ children }) => {
    return (
        <NotistackbarProvider
            TransitionComponent={Fade}
            autoHideDuration={5000}
            Components={{
                soft: SoftSnackbar
            }}
        >
            {children}
        </NotistackbarProvider>
    )
}

SnackbarProvider.propTypes = {
    children: PropTypes.node,
}

export default SnackbarProvider;