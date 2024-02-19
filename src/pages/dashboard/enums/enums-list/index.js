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
import { useState } from "react";

// React router components
import { useParams } from "react-router-dom";

// PropTypes
import PropTypes from "prop-types";

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
// import DataTable from "examples/Tables/DataTable";

// App components
import DataTable from "components/DataTable";

// Component dependencies
import EnumFormDialog from "./components/EnumFormDialog";
import EnumLogsDialog from "./components/EnumLogsDialog";
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
import Swal from "sweetalert2";

// Query string comopnents
import queryString from "query-string";


function EnumsList() {

  // I18n
  const { t } = useTranslation();

  // Query params
  const { type } = useParams();

  // Snackbar handlers
  const { enqueueSnackbar } = useSnackbar();

  // Form dialog props and handlers
  const [formDialogProps, setFormDialogProps] = useState({ open: false });

  // Logs dialog props and handlers
  const [logsDialogProps, setLogsDialogProps] = useState({ open: false });

  // DataTable
  const { data, total, currentPage, pageSize, refetch, changePage } = useTableData({
    type,
    getRowActionCellProps: row => ({
      onClick: async (event, action) => {
        switch (action) {
          case 'edit':
            try {
              const response = await axios('/api/EnumPanel?'.concat(
                queryString.stringify({ id: row.EnumId, EnumTypeCode: type })
              ));
              setFormDialogProps({ open: true, initialValues: response.data });
            } catch (error) {
              enqueueSnackbar(t("An error occurred"), { variant: 'soft', color: 'error' })
            }
            return;
          case 'log':
            setLogsDialogProps({ open: true, enumEntity: row, enumType: type });
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
                  url: '/api/EnumPanel/'.concat(row.UserId),
                  data: row
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

            }

            return;
        }
      }
    })
  });

  return (
    <>
      <Helmet title={t("Enum management", { enum: t(type, { count: 2 }) })} />

      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox my={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
              <SoftBox lineHeight={1}>
                <SoftTypography variant="h5" fontWeight="medium">
                  {t("Enum management", { enum: t(type, { count: 2 }) })}
                </SoftTypography>
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  {t("List of all system enums", { enum: t(type, { count: 2 }) })}
                </SoftTypography>
              </SoftBox>
              <Stack spacing={1} direction="row">
                <SoftButton
                  variant="gradient"
                  color="info"
                  size="small"
                  onClick={() => setFormDialogProps({ open: true, initialValues: { EnumTypeCode: type } })}
                >
                  + {t("Add enum", { enum: t(type) })}
                </SoftButton>
              </Stack>
            </SoftBox>

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

      <EnumFormDialog
        {...formDialogProps}
        onClose={() => setFormDialogProps({ open: false })}
        onSubmitSuccess={response => {
          enqueueSnackbar(response, { variant: 'soft', icon: 'check', color: 'success' });
          setFormDialogProps({ open: false })
          refetch();
        }}
      />

      <EnumLogsDialog
        {...logsDialogProps}
        onClose={() => setLogsDialogProps({ open: false })}
      />

    </>
  );
}

EnumsList.propTypes = {
  type: PropTypes.string.isRequired,
}

export default EnumsList;
