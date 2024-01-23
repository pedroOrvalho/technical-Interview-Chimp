import sql, { ConnectionPool, Request as SqlRequest } from "mssql";
import { NotFoundError } from "../helpers/apiError";

const config = {
  user: "sa",
  password: "DB_Password",
  server: "localhost",
  database: "AdventureWorksLT2022",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

type Product = {
  ProductID: number;
  Name: string;
  Color: string;
  StandardCost: number;
  ListPrice: number;
  ProductNumber: string;
};

export const getAllProductsService = async (): Promise<any[]> => {
  try {
    const pool: ConnectionPool = await sql.connect(config);

    const result = await pool
      .request()
      .query("SELECT TOP 40 * FROM SalesLT.Product");

    return result.recordset;
  } catch (error) {
    console.error("Error fetching sales data from service.");
    throw new Error("Error fetching products data");
  }
};

export const getProductByIdService = async (id: number) => {
  try {
    const pool: ConnectionPool = await sql.connect(config);

    const result = await pool
      .request()
      .input("ProductID", sql.Int, id)
      .query("SELECT * FROM SalesLT.Product WHERE ProductID = @ProductID");

    return result.recordset;
  } catch (error) {
    throw new Error(`Error fetching product data with id: ${id}`);
  }
};

export const updateProductByIdService = async (
  id: number,
  updatedData: Product
) => {
  try {
    const pool: ConnectionPool = await sql.connect(config);
    const request = pool.request();
    request.input("ProductID", sql.Int, id);
    request.input("UpdatedName", sql.VarChar(255), updatedData.Name);
    request.input(
      "UpdatedProductNumber",
      sql.VarChar(25),
      updatedData.ProductNumber
    );
    request.input("UpdatedColor", sql.VarChar(15), updatedData.Color);
    request.input(
      "UpdatedStandardCost",
      sql.Decimal(18, 4),
      updatedData.StandardCost
    );
    request.input(
      "UpdatedListPrice",
      sql.Decimal(18, 4),
      updatedData.ListPrice
    );

    const updateQuery = `
      UPDATE SalesLT.Product
      SET 
        Name = @UpdatedName,
        ProductNumber = @UpdatedProductNumber,
        Color = @UpdatedColor,
        StandardCost = @UpdatedStandardCost,
        ListPrice = @UpdatedListPrice
      WHERE ProductID = @ProductID
    `;

    const result = await request.query(updateQuery);

    await pool.close();

    return result;
  } catch (error) {
    throw new NotFoundError(
      `Could not update user with product ${id} from the database.`
    );
  }
};

export const deleteProductByIdService = async (id: number) => {
  try {
    const pool: ConnectionPool = await sql.connect(config);
    const request = pool.request();
    request.input("ProductID", sql.Int, id);

    const result = await request.query(
      "DELETE FROM SalesLT.Product WHERE ProductID = @ProductID"
    );

    await pool.close();

    return result;
  } catch (error) {
    console.error("Error deleting item.");
    throw new Error("Error deleting item.");
  }
};
