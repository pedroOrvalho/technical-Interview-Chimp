import { Request, Response, NextFunction } from "express";
import {
  deleteProductByIdService,
  getAllProductsService,
  getProductByIdService,
  updateProductByIdService,
} from "../service/ProductService";

export const getAllProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productsData = await getAllProductsService();
    res.json(productsData);
  } catch (error) {
    next(error);
  }
};

export const getProductByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const numericId = parseInt(id);
  try {
    const updatedProduct = await getProductByIdService(numericId);
    res.json(updatedProduct[0]);
  } catch (error) {
    next(error);
  }
};

export const updateProductByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const numericId = parseInt(id);

  const updatedData = req.body;
  try {
    const updatedProduct = await updateProductByIdService(
      numericId,
      updatedData
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProductByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  const numericId = parseInt(id);
  try {
    const deletedProduct = await deleteProductByIdService(numericId);
    res.json(deletedProduct);
  } catch (error) {
    next(error);
  }
};
