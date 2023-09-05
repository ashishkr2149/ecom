import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} from "./../controllers/categoryController.js";

const router = express.Router();

//ROUTES

// CREATE CATEGORY
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//UPDATE CATEGORY
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//GET ALl CATEGORY
router.get("/get-category", categoryControlller);

//SINGLE CATEGORY
router.get("/single-category/:slug", singleCategoryController);

//DELETE CATEGORY
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);

export default router;