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

// Soft UI Dashboard PRO React components
import SoftBadge from "components/SoftBadge";

// App components
import useDataTableLoader from "components/DataTable/useDataTableLoader";

// Lodash methods
import map from "lodash/map";

// I18n
import { useTranslation } from "react-i18next";

// Querystring 
import queryString from "query-string";

// Date-fns methods
import format from "date-fns-jalali/format";


const useTableData = ({ userId, loaderRowsCount = 3 }) => {

  // I18n
  const { t } = useTranslation();

  // Data
  const [data, setData] = useState({ Data: [], Total: 0 });
  const [searchParams, setSearchParams] = useState({
    Page: 1,
    PageSize: 9999
  })

  // Async methods and handlers
  const [fetching, setFetching] = useState(false);
  const fetchDataAsync = async () => {
    const response = await axios('/api/MyAccount/LogLogin?'.concat(
      queryString.stringify({ ...searchParams, Id: userId })
    ))
    setData({ Data: response.data.UserLog, Total: response.data.UserLog.length });
    setFetching(false);
  }

  useMemo(() => {
    if (userId) !fetching && setFetching(true);
    else setData({ Data: [], Total: 0 });
  }, [userId, searchParams]);

  useMemo(() => {
    fetching && fetchDataAsync();
  }, [fetching])


  // Badges
  const failed = (
    <SoftBadge variant="contained" color="error" size="xs" badgeContent={t("Unsuccess")} container />
  );
  const success = (
    <SoftBadge variant="contained" color="success" size="xs" badgeContent={t("Success")} container />
  );

  // Table columns definitions
  const columns = [
    {
      Header: t("Date and time"),
      accessor: "LogDate",
      Cell: ({ value }) => typeof value == "string" ? format(new Date(value), "dd/MM/yyyy HH:mm") : value
    },
    { Header: t("IP"), accessor: "IP_Address" },
    {
      Header: t("Status"),
      accessor: "LogStatus",
      Cell: ({ value }) => typeof value == "boolean" ? (value ? success : failed) : value,
    },
  ];

  // Table laoder
  const loader = useDataTableLoader(columns, { rowsCount: loaderRowsCount });

  return {
    refetch: fetchDataAsync,
    fetching,
    data: ({
      columns,
      rows: fetching ? loader : map(data.Data, row => ({
        ...row,
      }))
    }),
    total: Number(data.Total),
    currentPage: Number(searchParams.Page),
    pageSize: Number(searchParams.PageSize),
    changePage: page => setSearchParams({ ...searchParams, Page: page })
  }
};

export default useTableData;
