/**
=========================================================
* Soft UI Dashboard PRO React - v4.0.2
=========================================================

* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/* eslint-disable react/prop-types */
// Soft UI Dashboard PRO React components
import SoftBadge from "components/SoftBadge";

// Page components
import ActionCell from "../components/ActionCell";

// Lodash methods
import map from "lodash/map";

// I18n
import { useTranslation } from "react-i18next";


const useDataTableData = ({ data, getActionCellProps = () => ({}) }) => {

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
        cell: ({ value }) => (value ? success : failed),
      },
      {
        Header: t("Lock Status"),
        accessor: "Lock",
        cell: ({ value }) => (value ? success : failed),
      },
      { Header: t("Action"), accessor: "action", enableSorting: false },
    ],

    rows: map(data, item => ({
      ...item,
      action: <ActionCell {...getActionCellProps(item)} />
    }))
  })
};

export default useDataTableData;
