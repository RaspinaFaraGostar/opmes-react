// Proptyupe checking
import PropTypes from "prop-types";

// MUI components
import { Typography, keyframes, styled, useTheme } from "@mui/material";

// I18n
import { useTranslation } from "react-i18next";


// Root component
const HeartRate = styled('div')(({ theme }) => ({
    maxWidth: '180px',
    height: '143px',
    position: 'relative',
    margin: '0px auto',
    overflow: 'hidden',
    textAlign: "center"
}))


// Animation keyframes
const heartRateIn = keyframes`
    0% {
        width: 100%;
    }
    50% {
        width: 0%;
    }
    100% {
        width: 0;
    }
`

const heartRateOut = keyframes`
    0% {
        left: -120%;
    }
    30% {
        left: -120%;
    }
        100% {
        left: 0;
    }
`

const FadeIn = styled('div', {
    shouldForwardProp: prop => prop != 'fadeColor'
})(({ theme, fadeColor }) => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: fadeColor ?? theme.palette.background.default,
    top: 0,
    right: 0,
    animation: `${heartRateIn} 4s linear infinite`,
}))

const FadeOut = styled('div', {
    shouldForwardProp: prop => prop != 'fadeColor'
})(({ theme, fadeColor }) => {
    const color = fadeColor ?? theme.palette.background.default;
    return {
        position: 'absolute',
        width: '120%',
        height: '100%',
        top: 0,
        left: '-120%',
        animation: `${heartRateOut} 4s linear infinite`,
        background: color,
        background: `linear-gradient(to right, ${color} 0%, ${color} 80%, ${color} 100%)`
    }
})


const HeartRateLoader = ({ fadeColor, loadingText }) => {

    // I18n
    const { t } = useTranslation();

    // Theme 
    const theme = useTheme();

    return (
        (
            <HeartRate>
                <svg version="1.0" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="150px" height="73px" viewBox="0 0 150 73" enableBackground="new 0 0 150 73">
                    <polyline fill="none" stroke={theme.palette.info.light} strokeWidth="2" strokeMiterlimit="10" points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 84.122,45.486 97.297,45.486 103.379,40.419 110.473,45.486 150,45.486"
                    />
                </svg>
                <FadeIn fadeColor={fadeColor} />
                <FadeOut />
                {loadingText && (
                    <Typography display="block" alignItems="center" variant="caption" fontSize="small" position="relative">
                        {typeof loadingText == "string" ? loadingText : t("Loading...")}
                    </Typography>
                )}
            </HeartRate>
        )
    )
}

// Component default props
HeartRateLoader.defaultProps = {
    loadingText: true
}

// Component typechecking
HeartRateLoader.propTypes = {
    fadeColor: PropTypes.string,
    loadingText: PropTypes.oneOfType([PropTypes.string, PropTypes.bool])
}

export default HeartRateLoader