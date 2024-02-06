import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import axios from "axios";

import ProductsTable from "../components/ProductsTable";
import ProductsTableToolbar from "../components/ProductsTableToolbar";
import ProductsTablePagination from "../components/ProductsTablePagination";

import { Product } from "../Types";
import Search from "../components/Search";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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

  const searchProductsList: Product[] = searchValue
    ? products.filter(
        (product: Product) =>
          product.Name.toLowerCase().includes(searchValue.toLowerCase()) ||
          product.ProductNumber.toLowerCase().includes(
            searchValue.toLowerCase()
          ) ||
          product.Color.toLowerCase().includes(searchValue.toLowerCase())
      )
    : products;

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <ProductsTableToolbar
          numSelected={selected.length}
          selected={selected}
        />
        <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        <ProductsTable
          products={searchProductsList}
          selected={selected}
          setSelected={setSelected}
          page={page}
          rowsPerPage={rowsPerPage}
          searchValue={searchValue}
        />
        <ProductsTablePagination
          products={searchProductsList}
          setPage={setPage}
          page={page}
          setRowsPerPage={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      </Paper>
    </Box>
  );
}
