export type Product = {
  ProductID: number;
  Name: string;
  Color: string;
  StandardCost: number;
  ListPrice: number;
  ProductNumber: string;
  Detail: string;
};

export type Order = "asc" | "desc";
