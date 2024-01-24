import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-container">
      <h1>Manange Your Products</h1>
      <Button size="large" variant="contained">
        <Link id="home-link" to="/product">
          Products
        </Link>
      </Button>
    </div>
  );
}
