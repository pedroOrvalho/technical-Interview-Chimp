import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { Product } from "../Types";
import { Box, Button, Grid, TextField } from "@mui/material";

const data: Product = {
  ProductID: 0,
  Name: "",
  Color: "",
  StandardCost: 0,
  ListPrice: 0,
  ProductNumber: "",
  Detail: "",
};

export default function ProductDetail() {
  const { id } = useParams();
  const [productData, setProductData] = useState<Product>(data);
  const [loading, setLoading] = useState(true);
  const { Name, Color, StandardCost, ListPrice, ProductNumber } = productData;
  console.log(Name);
  console.log(Color);
  console.log(StandardCost);

  const getProductById = async (id: string | undefined) => {
    try {
      const response = await axios(
        `http://localhost:4000/products/detail/${id}`
      );
      const product = response.data;
      setProductData(product);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProductById(id);
  }, [id]);

  function onClickSubmit() {
    axios
      .put(`http://localhost:4000/products/${id}`, productData)
      .catch((error) => {
        console.log(error.response);
      });
  }

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <Box component="form" noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="Name"
              fullWidth
              id="Name"
              label="Name"
              autoFocus
              value={Name}
              onChange={(event) => {
                setProductData({ ...productData, Name: event.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="Color"
              fullWidth
              id="Color"
              label="Color"
              autoFocus
              value={Color}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  Color: event.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="Standard Cost"
              fullWidth
              id="Standard Cost"
              label="Standard Cost"
              autoFocus
              value={StandardCost}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  StandardCost: Number(event.target.value),
                });
              }}
              inputProps={{
                type: "number",
                step: "any", // Allows decimal numbers
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="List Price"
              fullWidth
              id="List Price"
              label="List Price"
              autoFocus
              value={ListPrice}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  ListPrice: Number(event.target.value),
                });
              }}
              inputProps={{
                type: "number",
                step: "any",
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="Product Number"
              fullWidth
              id="Product Number"
              label="Product Number"
              autoFocus
              value={ProductNumber}
              onChange={(event) => {
                setProductData({
                  ...productData,
                  ProductNumber: event.target.value,
                });
              }}
            />
          </Grid>
        </Grid>
        <Button onClick={onClickSubmit}>Update</Button>
      </Box>
    </div>
  );
}
