import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import { useTable, usePagination, useSortBy } from "react-table";
import TablePagination from "@material-ui/core/TablePagination";

import { ArrowUpward, ArrowDownward } from "@material-ui/icons";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    border: "1px solid #eaeaea",
  },
  header: {
    backgroundColor: "#46B399",
  },
  row: {
    backgroundColor: "#f4f4f4",
  },
  cWhite: {
    color: "white",
  },
  input: {
    height: "4rem",
  },
});

export default function Table({ columns, data }) {
  const classes = useStyles();
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

  const rowsPerPageOptions = [10, 25];

  return (
    <div>
      <TableContainer component={Paper}>
        <MaUTable {...getTableProps()} className={classes.table}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow
                {...headerGroup.getHeaderGroupProps()}
                className={classes.header}
              >
                {headerGroup.headers.map((column) => {
                  return (
                    <TableCell
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      className={classes.cWhite}
                    >
                      {column.render("Header")}{" "}
                      {!column.isSorted ? (
                        <i className="fa fa-sort"></i>
                      ) : column.isSortedDesc ? (
                        <i className="fa fa-sort-desc"></i>
                      ) : (
                        <i className="fa fa-sort-asc"></i>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  className={i % 2 ? classes.row : ""}
                >
                  {row.cells.map((cell) => {
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render("Cell")}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </MaUTable>
      </TableContainer>
      <div
        style={{
          padding: "8px 0px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TablePagination
          component="div"
          style={{ flex: 1 }}
          count={data.length}
          page={pageIndex}
          rowsPerPage={pageSize}
          rowsPerPageOptions={rowsPerPageOptions}
          onChangePage={(e, i) => {
            gotoPage(i);
          }}
          onChangeRowsPerPage={(e) => {
            setPageSize(parseInt(e.target.value));
          }}
        />
      </div>
    </div>
  );
}
