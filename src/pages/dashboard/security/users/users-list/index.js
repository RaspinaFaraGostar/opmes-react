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
import { useMemo, useState } from "react";

// react-router-dom components

// @mui material components
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Component dependencies
import UserFormDialog from "./components/UserFormDialog";
import useDataTableData from "./data/useDataTableData";

// I18n 
import { useTranslation } from "react-i18next";

// Axios
import axios, { AxiosError } from "axios";

// React helmet
import { Helmet } from "react-helmet";

// Notistack
import { useSnackbar } from "notistack";

// Sweetalert2 components
import Swal from "sweetalert2";

function UsersList() {

  // I18n
  const { t } = useTranslation();

  // Snackbar handlers
  const { enqueueSnackbar } = useSnackbar();

  // DataTable
  const [data, setData] = useState({ Data: [], Total: 0 });
  const dataTableData = useDataTableData({
    data: data.Data,
    getActionCellProps: row => ({
      onClick: async (event, action) => {
        switch (action) {
          case 'edit':
            setFormDialogProps({ open: true, initialValues: row });
            return;
          case 'delete':
            const newSwal = Swal.mixin({
              customClass: {
                confirmButton: "button button-error",
                cancelButton: "button button-text",
              },
              buttonsStyling: false,
            });

            const result = await newSwal.fire({
              title: t("Are you sure?"),
              text: t("You won't be able to revert this!"),
              showCancelButton: true,
              confirmButtonText: t("Confirm delete"),
              cancelButtonText: t("Cancel"),
              reverseButtons: true,
            });

            if (result.value) {
              try {
                const response = await axios({
                  method: 'DELETE',
                  url: '/api/UserPanel/'.concat(row.UserId),
                  data: row
                })

                enqueueSnackbar(response.data, { variant: 'soft', icon: 'check', color: 'success' });
                fetchDataAsync();
              } catch (error) {
                if (error instanceof AxiosError) {
                  if (error.response.status == 409) {
                    enqueueSnackbar(error.response.data.Message, { variant: 'soft', icon: 'close', color: 'error' });
                  }
                }
              }

            }

            return;
        }
      }
    })
  });

  // Data fetching handlers
  const fetchDataAsync = async () => {
    const response = await axios('api/UserPanel/List?Page=1&PageSize=25&Filter=&Sort=');
    setData(response.data);
  }

  useMemo(() => {
    fetchDataAsync();
  }, [])

  // Form dialog props and handlers
  const [formDialogProps, setFormDialogProps] = useState({ open: false });

  return (
    <>
      <Helmet title={t("Users management")} />

      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox my={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
              <SoftBox lineHeight={1}>
                <SoftTypography variant="h5" fontWeight="medium">
                  {t("Users management")}
                </SoftTypography>
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  A lightweight, extendable, dependency-free javascript HTML table plugin.
                </SoftTypography>
              </SoftBox>
              <Stack spacing={1} direction="row">
                <SoftButton
                  variant="gradient"
                  color="info"
                  size="small"
                  onClick={() => setFormDialogProps({ open: true })}
                >
                  + {t("Add user")}
                </SoftButton>
                <SoftButton variant="outlined" color="info" size="small">
                  {t("Export")}
                </SoftButton>
              </Stack>
            </SoftBox>
            <DataTable
              table={dataTableData}
              entriesPerPage={false}
            />
          </Card>
        </SoftBox>
        <Footer />
      </DashboardLayout>

      <UserFormDialog
        {...formDialogProps}
        onClose={() => setFormDialogProps({ open: false })}
        onSubmitSuccess={response => {
          enqueueSnackbar(response, { variant: 'soft', icon: 'check', color: 'success' });
          setFormDialogProps({ open: false })
          fetchDataAsync();
        }}
      />
    </>
  );
}

export default UsersList;
