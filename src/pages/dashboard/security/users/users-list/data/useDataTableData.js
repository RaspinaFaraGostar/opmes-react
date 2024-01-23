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

/* eslint-disable react/prop-types */
// Soft UI Dashboard PRO React components
import SoftBadge from "components/SoftBadge";

// ProductsList page components
import ProductCell from "../components/ProductCell";
import ActionCell from "../components/ActionCell";

// Lodash methods
import map from "lodash/map";

// I18n
import { useTranslation } from "react-i18next";


const useDataTableData = data => {

  const { t } = useTranslation();

  // Badges
  const failed = (
    <SoftBadge variant="contained" color="error" size="xs" badgeContent={t("Inactive")} container />
  );
  const success = (
    <SoftBadge variant="contained" color="success" size="xs" badgeContent={t("Active")} container />
  );


  return ({
    columns: [
      { Header: t("First Name"), accessor: "PersonalName" },
      { Header: t("Last Name"), accessor: "PersonalLastName" },
      { Header: t("Username"), accessor: "UserName" },
      { Header: t("Medical Number"), accessor: "MedicalNo" },
      {
        Header: t("Status"),
        accessor: "IsActive",
        Cell: ({ value }) => (value ? success : failed),
      },
      {
        Header: t("Lock Status"),
        accessor: "Lock",
        Cell: ({ value }) => (value ? success : failed),
      },
      { Header: t("Action"), accessor: "action" },
    ],

    rows: map(data, item => ({
      ...item,
      action: <ActionCell />
    }))
  })
};

export default useDataTableData;
