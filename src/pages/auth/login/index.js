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

import { useEffect, useMemo, useState } from "react";

// react-router-dom components
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import SoftAlert from "components/SoftAlert";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// I18next
import { useTranslation } from "react-i18next";

// Auth
import { useAuth } from "contexts/auth";

// axios
import axios, { AxiosError } from "axios";

// lodash methods
import mapKeys from "lodash/mapKeys";
import lowerFirst from "lodash/lowerFirst";
import mapValues from "lodash/mapValues";
import join from "lodash/join";
import pick from "lodash/pick";

// Images and icons
import backgroundImage from "assets/images/login-bg.jpg";
import { ReactComponent as RefetchCaptchaIcon } from "assets/icons/SolarRestartSquareLineDuotone.svg";

// Helmet
import { Helmet } from "react-helmet";


const CaptchaImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  display: "block",
  borderRadius: theme.borders.borderRadius.md,
}));

function Login() {

  // Translations
  const { t } = useTranslation();

  // Router location
  const location = useLocation();

  // Form data and errors
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    captcha: '',
    rememberMe: false,
  });

  // Formdata handlers
  const handleChangeInput = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleChangeCheckbox = e => setFormData({ ...formData, [e.target.name]: e.target.checked });

  // Captcha image state and handlers
  const [captcha, setCaptcha] = useState({ imagePath: '', token: '' });
  const getCaptchaFromResponse = response => mapValues(
    mapKeys(JSON.parse(response.data.Message), (value, key) => lowerFirst(key)),
    (value, key) => key == "imagePath" ? 'data:image/png;base64,'.concat(value) : value
  );
  const fetchCaptchaAsync = async () => {
    const response = await axios('/api/MyAccount/GetCaptcha');

    setCaptcha(getCaptchaFromResponse(response));
  }

  useEffect(() => {
    const captchaInterval = setInterval(() => fetchCaptchaAsync(), 60000);
    return () => clearInterval(captchaInterval);
  }, [])

  useMemo(() => {
    fetchCaptchaAsync();
  }, [error])


  // Login status, tranformations & handlers
  const [auth, dispatch] = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const getPostCaptcha = () => join([formData.captcha, captcha.token], ':');
  const getPostFormData = () => `grant_type=password&username=${formData.username}&password=${formData.password}&captcha=${getPostCaptcha()}`;
  const handleLogin = async (event) => {
    event.preventDefault();

    try {

      setIsLoggingIn(true);

      const response = await axios({
        method: 'POST',
        url: '/token',
        data: getPostFormData(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      dispatch({
        type: 'REVOKE_TOKEN',
        value: pick(response.data, ['access_token', 'refresh_token', 'expires_in'])
      });
    } catch (error) {
      if (error instanceof AxiosError)
        setError(error.response.data.error_description)
    } finally {
      setIsLoggingIn(false);
    }
  }

  if (auth.user) {
    return (
      <Navigate to={location.state?.from ?? '/'} replace />
    )
  }

  return (
    <>
      <Helmet title={t("Sign in")} />

      <BasicLayout
        title={t("Welcome")}
        description={t("Sign in via your credentials")}
        image={backgroundImage}
      >
        <Card>
          <SoftBox p={3} mb={1} textAlign="center">
            <SoftTypography variant="h5" fontWeight="medium">
              {t("Sign in")}
            </SoftTypography>
          </SoftBox>
          {/* <SoftBox mb={2}>
          <Socials />
        </SoftBox> */}
          <SoftBox p={3}>
            <Collapse in={Boolean(error)}>
              <SoftAlert color="error">
                <Typography variant="body2">{error}</Typography>
              </SoftAlert>
            </Collapse>
            <SoftBox component="form" role="form" onSubmit={handleLogin}>
              <SoftBox mb={2}>
                <SoftInput
                  name="username"
                  type="text"
                  placeholder={t("Username")}
                  value={formData.username}
                  onChange={handleChangeInput}
                />
              </SoftBox>
              <SoftBox mb={2}>
                <SoftInput
                  name="password"
                  type="password"
                  placeholder={t("Password")}
                  value={formData.password}
                  onChange={handleChangeInput}
                />
              </SoftBox>
              <SoftBox mb={2}>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={12} md={5}>
                    <SoftInput
                      name="captcha"
                      type="text"
                      placeholder={t("Captcha")}
                      value={formData.captcha}
                      onChange={handleChangeInput}
                    />
                  </Grid>
                  <Grid item xs={12} md={7}>
                    {captcha.imagePath && (
                      <Grid container alignItems="center">
                        <Grid item xs={10}>
                          <CaptchaImage src={captcha.imagePath} />
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton type="button" onClick={fetchCaptchaAsync}>
                            <RefetchCaptchaIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </SoftBox>
              <SoftBox display="flex" alignItems="center">
                <Switch
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChangeCheckbox}
                />
                <SoftTypography
                  variant="button"
                  fontWeight="regular"
                  onClick={() => setFormData({ ...formData, rememberMe: !formData.rememberMe })}
                  sx={{ cursor: "pointer", userSelect: "none", ml: 1 }}
                >
                  {t("Remember me")}
                </SoftTypography>
              </SoftBox>
              <SoftBox mt={4} mb={1}>
                <SoftButton
                  disabled={isLoggingIn}
                  type="submit"
                  variant="gradient"
                  color="info"
                  fullWidth
                >
                  {t("Sign in")}
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Card>
      </BasicLayout>
    </>
  );
}

export default Login;
