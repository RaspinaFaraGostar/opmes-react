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

// I18n
import { useTranslation } from "react-i18next";

// Querystring 
import queryString from "query-string";
import useTableFilter from "./useTableFilter";

// Date-fns methods
import format from "date-fns-jalali/format";


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
    const response = await axios('api/PatientPanel/List?'.concat(
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
        PageSize: 15,
        Filter: '',
        Sort: ''
      })
  }, [location])


  const columns = [
    { Header: '#', accessor: "row", width: 10, noFilter: true },
    { Header: t("Patient Personel ID"), accessor: "PersonelId", width: 'auto' },
    { Header: t("Patient Name"), accessor: "Name", width: 'auto' },
    { Header: t("Patient Last Name"), accessor: "Family", width: 'auto' },
    { Header: t("Patient Father Name"), accessor: "FatherName", width: 'auto' },
    { Header: t("Patient Subunit Name"), accessor: "SubUnitName", width: 'auto' },
    { Header: t("Patient National ID"), accessor: "NationalId", width: 'auto' },
    {
      Header: t("Patient Born Date"),
      accessor: "Birthday",
      width: 'auto',
      Cell: ({ value }) => typeof value == "string" ? format(new Date(value), "yyyy/MM/dd") : value
    },
    { Header: t("Patient Gender"), accessor: "GenderName", width: 'auto' },
    {
      Header: t("Patient Created At"),
      accessor: "Created",
      width: 'auto',
      Cell: ({ value }) => typeof value == "string" ? format(new Date(value), "yyyy/MM/dd") : value
    },
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
          action: <ActionCell {...getRowActionCellProps(row)} />
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
