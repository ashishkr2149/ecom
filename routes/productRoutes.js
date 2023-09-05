import express from "express";
import {
  createProductController,
  deleteProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  updateProductController,
  productListController,
  productCountController,
  productFiltersController
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

//ROUTES
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//ROUTES
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProductController
);

//GET PRODUCTS
router.get("/get-product", getProductController);

//SINGLE PRODUCT
router.get("/get-product/:slug", getSingleProductController);

//GET PHOTO
router.get("/product-photo/:pid", productPhotoController);

//DELETE PRODUCT
router.delete("/product/:pid", deleteProductController);

//FILTER PRODUCT
router.post("/product-filters", productFiltersController);

//PRODUCT COUNT
router.get("/product-count", productCountController);

//PRODUCT PER PAGE
router.get("/product-list/:page", productListController);

export default router;