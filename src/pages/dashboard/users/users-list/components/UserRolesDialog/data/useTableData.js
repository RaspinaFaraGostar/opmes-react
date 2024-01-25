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

// App components
import useDataTableLoader from "components/DataTable/useDataTableLoader";

// Page components
import ActionCell from "../components/ActionCell";

// Lodash methods
import map from "lodash/map";

// I18n
import { useTranslation } from "react-i18next";

// Querystring 
import queryString from "query-string";


const useTableData = ({
  userId,
  getRowActionCellProps = (row) => ({}),
  loaderRowsCount = 3
}) => {

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
  const [fetching, setFetching] = useState(false);
  const fetchDataAsync = async () => {
    const response = await axios('/api/UserRolePanel/GridList?'.concat(
      queryString.stringify({ ...searchParams, UserId: userId })
    ))
    setData(response.data);
    setFetching(false);
  }

  useMemo(() => {
    if (userId) !fetching && setFetching(true);
    else setData({ Data: [], Total: 0 });
  }, [userId, searchParams]);

  useMemo(() => {
    fetching && fetchDataAsync();
  }, [fetching])

  // Table columns definitions
  const columns = [
    { Header: t("Role Title"), accessor: "RoleTitle" },
    { Header: t("Unit Name"), accessor: "UnitName" },
    { Header: t("Action"), accessor: "action" },
  ]

  // Table loader
  const loader = useDataTableLoader(columns, { rowsCount: loaderRowsCount });

  return {
    refetch: fetchDataAsync,
    fetching,
    data: ({
      columns,
      rows: fetching ? loader : map(data.Data, row => ({
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
