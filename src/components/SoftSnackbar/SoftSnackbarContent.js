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

// react components
import { forwardRef } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import { SnackbarContent } from "notistack";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React base styles
import typography from "assets/theme/base/typography";

// Custom styles for the SoftSnackbar
import SoftSnackbarIconRoot from "components/SoftSnackbar/SoftSnackbarIconRoot";

const SoftSnackbarContent = forwardRef(
    function SoftSnackbarContent({ color, icon, title, dateTime, content, close, bgWhite, ...rest }, ref) {
        const { size } = typography;
        let titleColor;
        let dateTimeColor;
        let dividerColor;

        if (bgWhite) {
            titleColor = color;
            dateTimeColor = "dark";
            dividerColor = false;
        } else if (color === "light") {
            titleColor = "dark";
            dateTimeColor = "text";
            dividerColor = false;
        } else {
            titleColor = "white";
            dateTimeColor = "white";
            dividerColor = true;
        }

        return (
            <SnackbarContent ref={ref}>
                <SoftBox
                    variant={bgWhite ? "contained" : "gradient"}
                    bgColor={bgWhite ? "white" : color}
                    minWidth="21.875rem"
                    maxWidth="100%"
                    shadow="md"
                    borderRadius="md"
                    p={1}
                >
                    {(title || dateTime || close) && (
                        <SoftBox
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            color="dark"
                            p={1.5}
                        >
                            <SoftBox display="flex" alignItems="center" lineHeight={0}>
                                {icon && (
                                    <SoftSnackbarIconRoot fontSize="small" ownerState={{ color, bgWhite }}>
                                        {icon}
                                    </SoftSnackbarIconRoot>
                                )}
                                <SoftTypography
                                    variant="button"
                                    fontWeight="medium"
                                    color={titleColor}
                                    textGradient={bgWhite}
                                >
                                    {title}
                                </SoftTypography>
                            </SoftBox>
                            <SoftBox display="flex" alignItems="center" lineHeight={0}>
                                {dateTime && (
                                    <SoftTypography variant="caption" color={dateTimeColor}>
                                        {dateTime}
                                    </SoftTypography>
                                )}

                                {close && (
                                    <Icon
                                        sx={{
                                            color: ({ palette: { dark, white } }) =>
                                                bgWhite || color === "light" ? dark.main : white.main,
                                            fontWeight: ({ typography: { fontWeightBold } }) => fontWeightBold,
                                            cursor: "pointer",
                                            marginLeft: 2,
                                            transform: "translateY(-1px)",
                                        }}
                                        onClick={close}
                                    >
                                        close
                                    </Icon>
                                )}
                            </SoftBox>
                        </SoftBox>
                    )}
                    {content && (
                        <>
                            <Divider sx={{ margin: 0 }} light={dividerColor} />
                            <SoftBox p={1.5} color={bgWhite || color === "light" ? "text" : "white"} fontSize={size.sm}>
                                {content}
                            </SoftBox>
                        </>
                    )}
                </SoftBox>
            </SnackbarContent>
        );
    }
)

// Setting default values for the props of SoftSnackbarContent
SoftSnackbarContent.defaultProps = {
    bgWhite: false,
    color: "info",
};

// Typechecking props for SoftSnackbarContent
SoftSnackbarContent.propTypes = {
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
    icon: PropTypes.node,
    title: PropTypes.string.isRequired,
    dateTime: PropTypes.string,
    content: PropTypes.node,
    close: PropTypes.func,
    bgWhite: PropTypes.bool,
};

export default SoftSnackbarContent;
