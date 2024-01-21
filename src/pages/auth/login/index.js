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

import { useEffect, useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import styled from "@mui/material/styles/styled";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
// import Socials from "layouts/authentication/components/Socials";
// import Separator from "layouts/authentication/components/Separator";

// lodash methods
import mapKeys from "lodash/mapKeys";
import lowerFirst from "lodash/lowerFirst";
import mapValues from "lodash/mapValues";

// Images and vectors
import curved9 from "assets/images/login-bg.jpg";
import { ReactComponent as RefetchCaptchaIcon } from "assets/icons/SolarRestartSquareLineDuotone.svg";
import { useTranslation } from "react-i18next";
import axios from "axios";

const CaptchaImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  display: "block",
  borderRadius: theme.borders.borderRadius.md,
}));

function Login() {

  // Translations
  const { t } = useTranslation();

  // Form data
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
    const response = await axios({
      baseURL: window._shared.endpoint,
      url: '/MyAccount/GetCaptcha'
    });

    setCaptcha(getCaptchaFromResponse(response));
  }

  useEffect(() => {
    fetchCaptchaAsync();
  }, [])

  return (
    <BasicLayout
      title={t("Welcome")}
      description="Use these awesome forms to login or create new account in your project for free."
      image={curved9}
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
          <SoftBox component="form" role="form">
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
              <SoftButton variant="gradient" color="info" fullWidth>
                {t("Sign in")}
              </SoftButton>
            </SoftBox>
            {/* <Separator /> */}
            {/* <SoftBox mt={1} mb={3}>
              <SoftButton
                component={Link}
                to="/authentication/sign-up/basic"
                variant="gradient"
                color="dark"
                fullWidth
              >
                sign up
              </SoftButton>
            </SoftBox> */}
          </SoftBox>
        </SoftBox>
      </Card>
    </BasicLayout>
  );
}

export default Login;
