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

// @mui material components
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Icon from "@mui/material/Icon";
import Tooltip from "@mui/material/Tooltip";

// React router
import { Link, useParams } from "react-router-dom";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard PRO React example components
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// App components
import DataTable from "components/DataTable";

// Component dependencies
import QuestionFormDialog from "./components/QuestionFormDialog";
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


function QuestionsList() {

  // I18n
  const { t } = useTranslation();

  // React router query params
  const { questionGroupName } = useParams();

  // Snackbar handlers
  const { enqueueSnackbar } = useSnackbar();

  // Form dialog props and handlers
  const [formDialogProps, setFormDialogProps] = useState({ open: false });

  // DataTable
  const { data, total, currentPage, pageSize, refetch, changePage } = useTableData({
    getRowActionCellProps: row => ({
      onClick: async (event, action) => {
        switch (action) {
          case 'edit':
            try {
              const response = await axios('/api/QuestionPanel/'.concat(row.QuestionId));
              setFormDialogProps({ open: true, initialValues: response.data });
            } catch (error) {
              enqueueSnackbar(t("An error occurred"), { variant: 'soft', color: 'error' })
            }
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
                  url: '/api/QuestionPanel/'.concat(row.QuestionId),
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
      <Helmet title={t("Questions of", { questionGroup: questionGroupName })} />

      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox my={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
              <SoftBox display="flex" gap={2}>
                <Tooltip placement="top" title={t("Back to question groups")}>
                  <SoftButton
                    variant="outlined"
                    color="dark"
                    circular
                    iconOnly
                    component={Link}
                    to="/panel/enginQuestion/question"
                  >
                    <Icon>arrow_forward</Icon>
                  </SoftButton>
                </Tooltip>
                <SoftBox lineHeight={1}>
                  <SoftTypography variant="h5" fontWeight="medium">
                    {t("Questions of", { questionGroup: questionGroupName })}
                  </SoftTypography>
                  <SoftTypography variant="button" fontWeight="regular" color="text">
                    {t("List of questions of question group", { questionGroup: questionGroupName })}
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
              <Stack spacing={1} direction="row">
                <SoftButton
                  variant="gradient"
                  color="info"
                  size="small"
                  onClick={() => setFormDialogProps({ open: true })}
                >
                  + {t("Add question")}
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

      {/* <QuestionFormDialog
        {...formDialogProps}
        onClose={() => setFormDialogProps({ open: false })}
        onSubmitSuccess={response => {
          enqueueSnackbar(response, { variant: 'soft', icon: 'check', color: 'success' });
          setFormDialogProps({ open: false })
          refetch();
        }}
      /> */}
    </>
  );
}

export default QuestionsList;
