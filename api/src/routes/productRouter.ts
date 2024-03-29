import { Router } from "express";
import {
  getAllProductsController,
  deleteProductByIdController,
  updateProductByIdController,
  getProductByIdController,
} from "../controllers/ProductController";

const router = Router();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: []
 */
router.get("/products", getAllProductsController);

/**
 * @swagger
 * /products/detail/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Product ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             example: {}
 */
router.get("/products/detail/:id", getProductByIdController);

router.put("/products/:id", updateProductByIdController);
router.delete("/products/delete/:id", deleteProductByIdController);

export default router;
