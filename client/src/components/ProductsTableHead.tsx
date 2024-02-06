import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
  Box,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

import { Product, Order } from "../Types";

type HeadCell = {
  disablePadding: boolean;
  id: keyof Product;
  label: string;
  numeric: boolean;
};

const headCells: readonly HeadCell[] = [
  {
    id: "ProductID",
    numeric: false,
    disablePadding: true,
    label: "Id",
  },

  {
    id: "Name",
    numeric: true,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "Color",
    numeric: true,
    disablePadding: false,
    label: "Color",
  },
  {
    id: "StandardCost",
    numeric: true,
    disablePadding: false,
    label: "Standard Cost",
  },
  {
    id: "ListPrice",
    numeric: true,
    disablePadding: false,
    label: "List Price",
  },
  {
    id: "ProductNumber",
    numeric: false,
    disablePadding: true,
    label: "Product Number",
  },
  {
    id: "Detail",
    numeric: false,
    disablePadding: true,
    label: "",
  },
];

type ProductsTableProps = {
  numSelected: number;
  handleRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Product
  ) => void;
  handleSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
};

export function ProductsTableHead(props: ProductsTableProps) {
  const {
    handleSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    handleRequestSort,
  } = props;

  const createSortHandler =
    (property: keyof Product) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={handleSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
