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
import { useSearchParams } from "react-router-dom";

// Soft UI Dashboard PRO React components
import SoftBadge from "components/SoftBadge";

// Page components
import ActionCell from "../components/ActionCell";

// Lodash methods
import map from "lodash/map";
import every from "lodash/every";
import keys from "lodash/keys";
import includes from "lodash/includes";

// I18n
import { useTranslation } from "react-i18next";

// Querystring 
import queryString from "query-string";


const useTableData = ({ getRowActionCellProps = (row) => ({}) }) => {

  // I18n
  const { t } = useTranslation();

  // Data
  const [data, setData] = useState({ Data: [], Total: 0 });

  // Async methods and handlers
  const [searchParams, setSearchParams] = useSearchParams();
  const searchParamsIncludeNeededKeys = every(['Page', 'PageSize', 'Filter', 'Sort'], key => includes(keys(Object.fromEntries(searchParams)), key));

  const fetchDataAsync = async () => {
    // const response = await axios('api/UserPanel/List?Page=1&PageSize=25&Filter=&Sort=');
    const response = await axios('api/RolePanel/List?'.concat(
      queryString.stringify(Object.fromEntries(searchParams))
    ))
    setData(response.data);
  }

  useMemo(() => {
    if (searchParamsIncludeNeededKeys)
      fetchDataAsync();
  }, [searchParams]);

  useEffect(() => {
    if (!searchParamsIncludeNeededKeys)
      setSearchParams({
        ...Object.fromEntries(searchParams),
        Page: 1,
        PageSize: 25,
        Filter: '',
        Sort: ''
      })
  }, [])

  return {
    refetch: fetchDataAsync,
    data: ({
      columns: [
        { Header: t("First Name"), accessor: "RoleName" },
        { Header: t("Last Name"), accessor: "RoleCode" },
        { Header: t("Action"), accessor: "action", isSorted: false },
      ],

      rows: map(data.Data, row => ({
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
