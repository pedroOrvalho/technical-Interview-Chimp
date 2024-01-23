import { Box, Table, TableContainer } from "@mui/material";

import { Product, Order } from "../Types";
import { useState } from "react";
import { ProductsTableHead } from "./ProductsTableHead";
import ProductTableBody from "./ProductTableBody";

type Props = {
  products: Product[];
  selected: readonly number[];
  setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>;
  page: number;
  rowsPerPage: number;
};

export default function ProductsTable(props: Props) {
  const { products, selected, setSelected, page, rowsPerPage } = props;
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Product>("Name");

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Product
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = products.map((product) => product.ProductID);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  return (
    <Box>
      <TableContainer>
        <Table
          sx={{ minWidth: 750 }}
          aria-labelledby="tableTitle"
          size="medium"
        >
          <ProductsTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            handleSelectAllClick={handleSelectAllClick}
            handleRequestSort={handleRequestSort}
            rowCount={products.length}
          />
          <ProductTableBody
            products={products}
            selected={selected}
            setSelected={setSelected}
            page={page}
            rowsPerPage={rowsPerPage}
            order={order}
            orderBy={orderBy}
          />
        </Table>
      </TableContainer>
    </Box>
  );
}
