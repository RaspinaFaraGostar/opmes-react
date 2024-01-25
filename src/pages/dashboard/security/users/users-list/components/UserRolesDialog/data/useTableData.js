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

// React components
import { useMemo, useState } from "react";

// Page components
import ActionCell from "../components/ActionCell";

// Lodash methods
import map from "lodash/map";

// I18n
import { useTranslation } from "react-i18next";

// Querystring 
import queryString from "query-string";


const useTableData = ({ userId, getRowActionCellProps = (row) => ({}) }) => {

  // I18n
  const { t } = useTranslation();

  // Data
  const [data, setData] = useState({ Data: [], Total: 0 });
  const [searchParams, setSearchParams] = useState({
    Page: 1,
    PageSize: 25,
    Filter: "",
    Sort: ""
  })

  // Async methods and handlers
  const fetchDataAsync = async () => {
    const response = await axios('/api/UserRolePanel/GridList?'.concat(
      queryString.stringify({ ...searchParams, UserId: userId })
    ))
    setData(response.data);
  }

  useMemo(() => {
    if (userId) fetchDataAsync();
    else setData({ Data: [], Total: 0 });
  }, [userId, searchParams]);


  return {
    refetch: fetchDataAsync,
    data: ({
      columns: [
        { Header: t("Role Title"), accessor: "RoleTitle" },
        { Header: t("Unit Name"), accessor: "UnitName" },
        { Header: t("Action"), accessor: "action" },
      ],

      rows: map(data.Data, row => ({
        ...row,
        action: <ActionCell {...getRowActionCellProps(row)} />
      }))
    }),
    total: Number(data.Total),
    currentPage: Number(searchParams.Page),
    pageSize: Number(searchParams.PageSize),
    changePage: page => setSearchParams({ ...searchParams, Page: page })
  }
};

export default useTableData;
