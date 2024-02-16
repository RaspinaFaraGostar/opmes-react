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
import { useNavigate } from "react-router-dom";

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

// React helmet
import { Helmet } from "react-helmet";

// Component dependencies
import QuestionGroupAccessDialog from "./components/QuestionGroupAccessDialog";

// Notistack
import { useSnackbar } from "notistack";


function QuestionGroupsList() {

  // I18n
  const { t } = useTranslation();

  // Snackbar handlers
  const { enqueueSnackbar } = useSnackbar();

  // React router navigate
  const navigate = useNavigate();

  // Access list dialog
  const [accessDialogProps, setAccessDialogProps] = useState({ open: false });

  // DataTable
  const { data, total, currentPage, pageSize, changePage } = useTableData({
    getRowActionCellProps: (row) => ({
      onClick: async (event, action) => {
        switch (action) {
          case 'access':
            setAccessDialogProps({ open: true, questionGroup: row });
            return;
        }
      }
    })
  });

  return (
    <>
      <Helmet title={t("Question Groups")} />

      <DashboardLayout>
        <DashboardNavbar />
        <SoftBox my={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="flex-start" p={3}>
              <SoftBox lineHeight={1}>
                <SoftTypography variant="h5" fontWeight="medium">
                  {t("Question Groups")}
                </SoftTypography>
                <SoftTypography variant="button" fontWeight="regular" color="text">
                  {t("List of all question groups")}
                </SoftTypography>
              </SoftBox>
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


      <QuestionGroupAccessDialog
        {...accessDialogProps}
        onClose={() => setAccessDialogProps({ open: false })}
        onSubmitSuccess={response => {
          enqueueSnackbar(response, { variant: 'soft', icon: 'check', color: 'success' });
          setAccessDialogProps({ open: false });
        }}
      />
    </>
  );
}

export default QuestionGroupsList;
