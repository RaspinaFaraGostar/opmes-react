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

// React componenets and hooks

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// App components
import DataTable from "components/DataTable";

// Component dependencies
import useTableData from "./data/useTableData";

// I18n 
import { useTranslation } from "react-i18next";

// React helmet
import { Helmet } from "react-helmet";


function PatientReportsList() {

  // I18n
  const { t } = useTranslation();

  // DataTable
  const { data, total, currentPage, pageSize, refetch, changePage } = useTableData({});

  return (
    <>
      <Helmet title={t("Patient FollowUps")} />

      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox my={3}>
          <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
            <SoftBox lineHeight={1}>
              <SoftTypography variant="h5" fontWeight="medium">
                {t("Patient FollowUps")}
              </SoftTypography>
              <SoftTypography variant="button" fontWeight="regular" color="text">
                {t("List of all patients follow ups")}
              </SoftTypography>
            </SoftBox>
          </SoftBox>

          <Card>
            <Grid container>
              <Grid item xs={12} md={3}>

              </Grid>
              <Grid item xs={12} md={9}>
                <DataTable
                  table={data}
                  totalCount={total}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={changePage}
                />
              </Grid>
            </Grid>
          </Card>
        </SoftBox>
        <Footer />
      </DashboardLayout>

    </>
  );
}

export default PatientReportsList;
