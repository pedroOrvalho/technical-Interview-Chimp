import sql from "mssql";

import app from "./app";

const port = 4000;

const config = {
  user: "SA",
  password: "DB_Password",
  server: "localhost",
  database: "AdventureWorksLT2022",
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

sql
  .connect(config)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.log(
      "Mssql connection error. Please make sure database is running."
    );
    console.error("Mssql connection error:", error.message);
    process.exit(1);
  });
