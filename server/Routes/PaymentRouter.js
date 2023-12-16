import express from "express";
import { protect, admin } from "../middlewares/Auth.js";
import * as paymentController from "../Controllers/PaymentController.js";

const router = express.Router();

// PUBLIC ROUTES

router.get("/:id", protect, paymentController.getPaymentById);
router.post("/", protect, paymentController.createPayment);

// ADMIN ROUTES

router.get("/", protect, admin, paymentController.getPayments);
router.put("/:id", protect, admin, paymentController.updatePayment);
router.delete("/:id", protect, admin, paymentController.deletePayment);

export default router;
