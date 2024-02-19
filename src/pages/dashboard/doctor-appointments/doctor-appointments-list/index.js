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

// Axios
import axios, { AxiosError } from "axios";

// React helmet
import { Helmet } from "react-helmet";

// Notistack
import { useSnackbar } from "notistack";

// Sweetalert2 components
import SearchForm from "./components/SearchForm";


function DoctorAppointmentsList() {

  // I18n
  const { t } = useTranslation();

  // Snackbar handlers
  const { enqueueSnackbar } = useSnackbar();

  // DataTable
  const { data, total, currentPage, pageSize, refetch, changePage } = useTableData({
    getRowActionCellProps: row => ({
      onClick: async (event, action) => {
        switch (action) {
          case 'status':
            try {
              const response = await axios({
                method: 'PUT',
                url: '/api/DoctorAppointmentDtlPanel/SetVisit/'.concat(row.DoctorAppointmentDtlId)
              })

              enqueueSnackbar(response.data, { variant: 'soft', icon: 'check', color: 'success' });
              refetch();
            } catch (error) {
              if (error instanceof AxiosError) {
                if (error.response.status == 409) {
                  enqueueSnackbar(error.response.data.Message, { variant: 'soft', icon: 'close', color: 'error' });
                }
              }
            }

            return;
        }
      }
    })
  });

  return (
    <>
      <Helmet title={t("Doctor Appointments")} />

      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox my={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
              <SoftBox lineHeight={1}>
                <SoftTypography variant="h5" fontWeight="medium">
                  {t("Doctor Appointments")}
                </SoftTypography>
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  {t("List of all doctor appointments")}
                </SoftTypography>
              </SoftBox>
            </SoftBox>

            <SearchForm />

            <DataTable
              table={data}
              totalCount={total}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={changePage}
            />
          </Card>
        </SoftBox>
        <Footer />
      </DashboardLayout>

    </>
  );
}

export default DoctorAppointmentsList;
