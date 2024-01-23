import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import axios from "axios";

import ProductsTable from "../components/ProductsTable";
import ProductsTableToolbar from "../components/ProductsTableToolbar";
import ProductsTablePagination from "../components/ProductsTablePagination";

import { Product } from "../Types";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const response = await axios("http://localhost:4000/products");
      const products = response.data;
      setProducts(products);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <ProductsTableToolbar numSelected={selected.length} selected={selected} />
        <ProductsTable
          products={products}
          selected={selected}
          setSelected={setSelected}
          page={page}
          rowsPerPage={rowsPerPage}
        />
        <ProductsTablePagination
          products={products}
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </Paper>
    </Box>
  );
}
