const express = require("express");
const router = express.Router();
const {
  authenticationController,
  crudController,
  userOrderController,
} = require("../controllers");

// ******************
// Authentication
// ******************

// signup
router.post("/api/signUp", authenticationController.signUp);

// login
router.post("/api/login", authenticationController.login);

// forget password
router.put("/api/forgotPassword", authenticationController.forgotpassword);

// delete
router.delete("/api/deleteAccount", authenticationController.deleteAccount);

// *****************
// Another work
// *****************

// CRUD OPERATION
// ==============

// get data
router.get("/api/plant", crudController.getData);

// create data
router.post("/api/plant", crudController.createData);

// update data
router.put("/api/plant", crudController.updateData);

// delete data
router.delete("/api/plant", crudController.deleteData);

// USER DATA
// =========

// create
router.post("/api/checkout", userOrderController.createData);

// get data
router.get("/api/checkout", userOrderController.getData);

// delete data
router.delete("/api/checkout", userOrderController.deleteData);

module.exports = router;
