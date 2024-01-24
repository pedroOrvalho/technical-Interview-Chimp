import { useMemo } from "react";
import { Link } from "react-router-dom";

import { TableBody, TableRow, TableCell, Checkbox } from "@mui/material";

import { Order, Product } from "../Types";

type Props = {
  selected: readonly number[];
  setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>;
  products: Product[];
  page: number;
  rowsPerPage: number;
  order: Order;
  orderBy: keyof Product;
  searchValue:string
};

export default function ProductTableBody(props: Props) {
  const { products, selected, setSelected, page, rowsPerPage, order, orderBy, searchValue } =
    props;


  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
  ) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
  ) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  const visibleRows = useMemo(
    () =>
      stableSort(products, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [searchValue, order, orderBy, page, rowsPerPage]
  );

  return (
    <TableBody>
      {visibleRows.map((row) => {
        const isItemSelected = isSelected(row.ProductID);

        return (
          <TableRow
            hover
            role="checkbox"
            aria-checked={isItemSelected}
            tabIndex={-1}
            key={row.ProductID}
            selected={isItemSelected}
            sx={{ cursor: "pointer" }}
          >
            <TableCell padding="checkbox">
              <Checkbox
                onClick={(event) => handleClick(event, row.ProductID)}
                color="primary"
                checked={isItemSelected}
                inputProps={{
                  "aria-labelledby": row.ProductID.toString(),
                }}
              />
            </TableCell>
            <TableCell
              component="th"
              id={row.ProductID.toString()}
              scope="row"
              padding="none"
            >
              {row.ProductID}
            </TableCell>
            <TableCell align="right">{row.Name}</TableCell>
            <TableCell align="right">{row.Color}</TableCell>
            <TableCell align="right">{row.StandardCost}</TableCell>
            <TableCell align="right">{row.ListPrice}</TableCell>
            <TableCell align="right">{row.ProductNumber}</TableCell>
            <TableCell align="right">
              <Link to={`/product/${row.ProductID}`}>Detail</Link>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
}
