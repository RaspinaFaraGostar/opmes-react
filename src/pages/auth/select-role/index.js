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
import { Navigate, useLocation } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// I18next
import { useTranslation } from "react-i18next";

// Auth
import { useAuth } from "contexts/auth";

// axios
import axios, { AxiosError } from "axios";

// lodash methods
import pick from "lodash/pick";

// Images and icons
import backgroundImage from "assets/images/login-bg.jpg";

// Helmet
import { Helmet } from "react-helmet";


function SelectRole() {

  // Translations
  const { t } = useTranslation();

  // Authetnication hook and handler
  const [auth, dispatch] = useAuth();

  // Router navigation & location 
  const location = useLocation();

  // Roles fetch & local state
  const [roles, setRoles] = useState([]);
  const fetchRolesAsync = async () => {
    const response = await axios('/api/UserRoleSelectPanel');
    setRoles(response.data);
  }

  useEffect(() => {
    if (auth.user)
      fetchRolesAsync();
  }, []);


  // Select role handlers
  const [isLoading, setIsLoading] = useState(false);
  const getPostFormData = (roleId) => `grant_type=refresh_token&refresh_token=${auth.refresh_token}&Id=${roleId}`;
  const handleSelectRole = async (roleId) => {

    try {

      setIsLoading(true);

      const response = await axios({
        method: 'POST',
        url: '/token',
        data: getPostFormData(roleId),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      dispatch({
        type: 'REVOKE_TOKEN',
        value: pick(response.data, ['access_token', 'expires_in', 'refresh_token'])
      });

    } catch (error) {
      if (error instanceof AxiosError)
        setError(error.response.data.error_description)
    } finally {
      setIsLoading(false);
    }
  }


  if (!auth.user) {
    return (
      <Navigate to='/login' state={location.state} replace />
    )
  }

  if (auth.user.RoleCode) {
    return (
      <Navigate to={location.state?.from ?? '/'} replace />
    )
  }

  return (
    <>
      <Helmet title={t("Select role")} />

      <BasicLayout
        title={t("Welcome")}
        description={t("Choose your role")}
        image={backgroundImage}
        containerGridItemProps={{
          xs: 12,
          sm: 10,
          md: 8,
          lg: 6,
          xl: 5
        }}
      >
        <Grid container spacing={2}>
          {roles.map((role, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <Card>
                <SoftBox p={3} textAlign="center">
                  <SoftTypography variant="h6" fontWeight="medium">
                    {t(role.UnitName)}
                  </SoftTypography>
                  <SoftTypography variant="caption" fontWeight="medium">
                    {t(role.RoleTitle)}
                  </SoftTypography>
                  <SoftBox mt={4} mb={1}>
                    <SoftButton
                      type="submit"
                      variant="gradient"
                      color="info"
                      fullWidth
                      disabled={isLoading}
                      onClick={() => handleSelectRole(role.UserRoleId)}
                    >
                      {t("Select role")}
                    </SoftButton>
                  </SoftBox>
                </SoftBox>
              </Card>
            </Grid>
          ))}
        </Grid>
      </BasicLayout>
    </>
  );
}

export default SelectRole;
