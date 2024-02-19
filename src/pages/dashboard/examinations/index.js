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

// @mui material components
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Examinations page components
import Sidenav from "./components/Sidenav";

// React helmet
import { Helmet } from "react-helmet";

// I18n
import { useTranslation } from "react-i18next";

// Component dependencies
import Header from "./components/Header";

// Layout context
import { ExaminationsLayoutConfigProvider } from "./context";

function Examinations() {

  const { t } = useTranslation();

  return (
    <>
      <Helmet title={t("Examinations")} />

      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox my={3}>
          <ExaminationsLayoutConfigProvider>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={3}>
                <Sidenav />
              </Grid>
              <Grid item xs={12} lg={9}>
                <SoftBox mb={3}>

                  <SoftBox mb={3}>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Header />
                      </Grid>
                    </Grid>
                  </SoftBox>

                </SoftBox>
              </Grid>
            </Grid>
          </ExaminationsLayoutConfigProvider>
        </SoftBox>
        <Footer />
      </DashboardLayout>

    </>
  );
}

export default Examinations;
