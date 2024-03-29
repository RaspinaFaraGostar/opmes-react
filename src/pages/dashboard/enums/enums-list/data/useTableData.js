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

// Page components
import ActionCell from "../components/ActionCell";

// App components
import useDataTableLoader from "components/DataTable/useDataTableLoader";

// Lodash methods
import every from "lodash/every";
import includes from "lodash/includes";
import keys from "lodash/keys";
import map from "lodash/map";
import some from "lodash/some";

// I18n
import { useTranslation } from "react-i18next";

// Querystring 
import queryString from "query-string";
import useTableFilter from "./useTableFilter";


const useTableData = ({ type, getRowActionCellProps = (row) => ({}), loaderRowsCount = 10 }) => {

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
    const response = await axios('api/EnumPanel?'.concat(
      queryString.stringify({
        EnumTypeCode: type,
        ...Object.fromEntries(searchParams)
      })
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
        PageSize: 15,
        Filter: '',
        Sort: ''
      })
  }, [location])

  const columns = [
    { Header: '#', accessor: "row", width: 10, noFilter: true },
    { Header: t(type), accessor: "EnumName", width: 'auto' },

    ...(some(data.Data, item => item.ParentName != null) ? [{
      Header: t("Enum Parent Name", { enum: t(type) }), accessor: "ParentName", width: 'auto'
    }] : []),

    { Header: t("Action"), accessor: "action", width: 'auto', noFilter: true },
  ];

  // Get loader
  const loader = useDataTableLoader(columns, { rowsCount: loaderRowsCount });

  // Table filter
  const filterRow = useTableFilter(columns);

  return {
    refetch: fetchDataAsync,
    fetching,
    data: ({
      columns,
      rows: [
        filterRow,

        ...(fetching ? loader : []),

        ...(!fetching ? map(data.Data, (row, index) => ({
          row: ((Number(searchParams.get('Page')) - 1) * Number(searchParams.get('PageSize'))) + (index + 1),
          ...row,
          action: <ActionCell type={type} {...getRowActionCellProps(row)} />
        })) : [])
      ]
    }),
    total: Number(data.Total),
    currentPage: Number(searchParams.get('Page')),
    pageSize: Number(searchParams.get('PageSize')),
    changePage: page => setSearchParams({ ...Object.fromEntries(searchParams), Page: page })
  }
};

export default useTableData;
