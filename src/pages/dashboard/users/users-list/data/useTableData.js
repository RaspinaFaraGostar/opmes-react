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
import { useEffect, useMemo, useState } from "react";

// React Router DOM componenets
import { useLocation, useSearchParams } from "react-router-dom";

// Soft UI Dashboard PRO React components
import SoftBadge from "components/SoftBadge";

// Page components
import ActionCell from "../components/ActionCell";

// App components
import useDataTableLoader from "components/DataTable/useDataTableLoader";

// Lodash methods
import every from "lodash/every";
import includes from "lodash/includes";
import keys from "lodash/keys";
import map from "lodash/map";

// I18n
import { useTranslation } from "react-i18next";

// Querystring 
import queryString from "query-string";


const useTableData = ({ getRowActionCellProps = (row) => ({}), loaderRowsCount = 10 }) => {

  // I18n
  const { t } = useTranslation();

  // React router location
  const location = useLocation();

  // Data
  const [data, setData] = useState({ Data: [], Total: 0 });

  // Async methods and handlers
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsIncludeNeededKeys = every(['Page', 'PageSize', 'Filter', 'Sort'], key => includes(keys(Object.fromEntries(searchParams)), key));

  const [fetching, setFetching] = useState(false);
  const fetchDataAsync = async () => {
    const response = await axios('api/UserPanel/List?'.concat(
      queryString.stringify(Object.fromEntries(searchParams))
    ))
    setData(response.data);
    setFetching(false);
  }

  useMemo(() => {
    if (searchParamsIncludeNeededKeys)
      !fetching && setFetching(true);
  }, [searchParams]);

  useMemo(() => {
    fetching && fetchDataAsync();
  }, [fetching])

  useEffect(() => {
    if (!searchParamsIncludeNeededKeys)
      setSearchParams({
        ...Object.fromEntries(searchParams),
        Page: 1,
        PageSize: 25,
        Filter: '',
        Sort: ''
      })
  }, [location])

  // Badges
  const failed = (
    <SoftBadge variant="contained" color="error" size="xs" badgeContent={t("Inactive")} container />
  );
  const success = (
    <SoftBadge variant="contained" color="success" size="xs" badgeContent={t("Active")} container />
  );


  const columns = [
    { Header: t("First Name"), accessor: "PersonalName" },
    { Header: t("Last Name"), accessor: "PersonalLastName" },
    { Header: t("Username"), accessor: "UserName" },
    { Header: t("Medical Number"), accessor: "MedicalNo" },
    {
      Header: t("Status"),
      accessor: "IsActive",
      Cell: ({ value }) => typeof value == "boolean" ? (value ? success : failed) : value,
    },
    {
      Header: t("Lock Status"),
      accessor: "Lock",
      Cell: ({ value }) => typeof value == "boolean" ? (value ? success : failed) : value,
    },
    { Header: t("Action"), accessor: "action" },
  ];

  // Get loader
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
    currentPage: Number(searchParams.get('Page')),
    pageSize: Number(searchParams.get('PageSize')),
    changePage: page => setSearchParams({ ...Object.fromEntries(searchParams), Page: page })
  }
};

export default useTableData;
