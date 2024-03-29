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

import { useMemo, useEffect, useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// react-table components
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from "react-table";

// @mui material components
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard PRO React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftSelect from "components/SoftSelect";
import SoftInput from "components/SoftInput";
import SoftPagination from "components/SoftPagination";

// Soft UI Dashboard PRO React example components
import DataTableHeadCell from "./DataTableHeadCell";
import DataTableBodyCell from "./DataTableBodyCell";
import { useSearchParams } from "react-router-dom";
import queryString from "query-string";
import { useTranslation } from "react-i18next";
import { InputAdornment, TextField } from "@mui/material";
import { useDebounce } from "@uidotdev/usehooks";

function DataTable({
  table,
  pageSize,
  currentPage,
  totalCount,
  onPageChange,
  pagination,
  showTotalEntries,
}) {

  // I18n
  const { t } = useTranslation();

  // Change columns and data on table change
  const columns = useMemo(() => table.columns, [table]);
  const data = useMemo(() => table.rows, [table]);

  // Create table insntace
  const tableInstance = useTable(
    { columns, data },
    // useGlobalFilter,
    // useSortBy,
    // usePagination
  );


  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    // page,
    // pageOptions,
    // canPreviousPage,
    // canNextPage,
    // gotoPage,
    // nextPage,
    // previousPage,
    // setPageSize,
    // setGlobalFilter,
    // state: { currentPage, pageSize, globalFilter },
  } = tableInstance;

  const pageOptions = pageSize > 0 ? Array.from({ length: Math.ceil(totalCount / pageSize) }, (_, i) => i + 1) : [];
  const canNextPage = pageOptions.length > 0 && currentPage != pageOptions[pageOptions.length - 1]
  const canPreviousPage = pageOptions.length > 0 && currentPage != pageOptions[0];

  // Set the default value for the entries per page when component mounts
  // useEffect(() => setPageSize(defaultValue || 10), [defaultValue]);

  // Set the entries per page value based on the select value
  // const setEntriesPerPage = ({ value }) => setPageSize(value);

  // Render the paginations
  const renderPagination = pageOptions.map((option) => (
    <SoftPagination
      item
      key={option}
      onClick={() => onPageChange(Number(option))}
      active={currentPage === option}
    >
      {option}
    </SoftPagination>
  ));

  // Handler for the input to set the pagination index

  // Customized page options starting from 1
  const customizedPageOptions = pageOptions.map((option) => option - 1);

  // Setting value for the pagination input
  const [inputPaginationvalue, setInputPaginationValue] = useState('');
  const handleInputPaginationValue = ({ target: value }) => setInputPaginationValue(Number(value.value));
  const inputPaginationValueDebounced = useDebounce(inputPaginationvalue, 1000);
  const handleInputPagination = () =>
    inputPaginationValueDebounced > pageOptions.length || inputPaginationValueDebounced < 0 ? onPageChange(1) : onPageChange(inputPaginationValueDebounced);
  useMemo(handleInputPagination, [inputPaginationValueDebounced]);

  // // Search input value state
  // const [search, setSearch] = useState(globalFilter);

  // // Search input state handle
  // const onSearchChange = useAsyncDebounce((value) => {
  //   setGlobalFilter(value || undefined);
  // }, 100);

  // // A function that sets the sorted value for the table
  // const setSortedValue = (column) => {
  //   let sortedValue;

  //   if (isSorted && column.isSorted) {
  //     sortedValue = column.isSortedDesc ? "desc" : "asce";
  //   } else if (isSorted) {
  //     sortedValue = "none";
  //   } else {
  //     sortedValue = false;
  //   }

  //   return sortedValue;
  // };

  // Setting the entries starting point
  const entriesStart = currentPage === 1 ? currentPage : ((currentPage - 1) * pageSize) + 1;

  // Setting the entries ending point
  let entriesEnd;

  if (currentPage === 1) {
    entriesEnd = pageSize < totalCount ? pageSize : totalCount;
  } else if (currentPage === pageOptions.length) {
    entriesEnd = totalCount;
  } else {
    entriesEnd = pageSize * currentPage;
  }

  return (
    <TableContainer sx={{ boxShadow: "none" }}>
      <Table {...getTableProps()}>
        <SoftBox component="thead">
          {headerGroups.map((headerGroup, key) => (
            <TableRow key={key} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, key) => (
                <DataTableHeadCell
                  key={key}
                  {...column.getHeaderProps()}
                  width={column.width ? column.width : "auto"}
                  align={column.align ? column.align : "left"}
                // sorted={setSortedValue(column)}
                >
                  {column.render("Header")}
                </DataTableHeadCell>
              ))}
            </TableRow>
          ))}
        </SoftBox>
        <TableBody {...getTableBodyProps()}>
          {rows.map((row, key) => {
            prepareRow(row);
            return (
              <TableRow key={key} {...row.getRowProps()}>
                {row.cells.map((cell, key) => (
                  <DataTableBodyCell
                    key={key}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
                  </DataTableBodyCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      <SoftBox
        display="flex"
        flexDirection={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        p={!showTotalEntries && pageOptions.length === 1 ? 0 : 3}
      >
        {showTotalEntries && (
          <SoftBox mb={{ xs: 3, sm: 0 }}>
            <SoftTypography variant="button" color="secondary" fontWeight="regular">
              {t("Showing total entries", { from: entriesStart, to: entriesEnd, total: totalCount })}
            </SoftTypography>
          </SoftBox>
        )}
        {pageOptions.length > 1 && (
          <SoftPagination
            variant={pagination.variant ? pagination.variant : "gradient"}
            color={pagination.color ? pagination.color : "info"}
          >
            {canPreviousPage && (
              <SoftPagination item onClick={() => onPageChange(currentPage - 1)}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_right</Icon>
              </SoftPagination>
            )}
            {/* {renderPagination} */}
            {renderPagination.length > 6 ? (
              <SoftBox mx={1}>
                <TextField
                  margin="none"
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      padding: 0
                    }
                  }}
                  inputProps={{ type: "number", min: 1, max: customizedPageOptions.length }}
                  value={customizedPageOptions[currentPage]}
                  onChange={handleInputPaginationValue}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {pageOptions[pageOptions.length - 1]}
                      </InputAdornment>
                    ),
                  }}
                />
              </SoftBox>
            ) : (
              renderPagination
            )}
            {canNextPage && (
              <SoftPagination item onClick={() => onPageChange(currentPage + 1)}>
                <Icon sx={{ fontWeight: "bold" }}>chevron_left</Icon>
              </SoftPagination>
            )}
          </SoftPagination>
        )}
      </SoftBox>
    </TableContainer>
  );
}

// Setting default values for the props of DataTable
DataTable.defaultProps = {
  // entriesPerPage: { defaultValue: 10, entries: [5, 10, 15, 20, 25] },
  // canSearch: false,
  showTotalEntries: true,
  pagination: { variant: "gradient", color: "info" },
  onPageChange: (page) => { }
  // isSorted: true,
  // noEndBorder: false,
};

// Typechecking props for the DataTable
DataTable.propTypes = {
  // entriesPerPage: PropTypes.oneOfType([
  //   PropTypes.shape({
  //     defaultValue: PropTypes.number,
  //     entries: PropTypes.arrayOf(PropTypes.number),
  //   }),
  //   PropTypes.bool,
  // ]),
  // canSearch: PropTypes.bool,
  table: PropTypes.objectOf(PropTypes.array).isRequired,
  totalCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func,

  pagination: PropTypes.shape({
    variant: PropTypes.oneOf(["contained", "gradient"]),
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
    ]),
  }),
  showTotalEntries: PropTypes.bool,
  // isSorted: PropTypes.bool,
  // noEndBorder: PropTypes.bool,
};

export default DataTable;
