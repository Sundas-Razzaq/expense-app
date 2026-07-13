import express from "express";

import {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
} from "../controllers/transactionController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import { transactionSchema } from "../validations/transactionValidation.js";

const router = express.Router();

// Create Transaction
router.post("/", authMiddleware, validate(transactionSchema), createTransaction);

// Get All Transactions
router.get("/", authMiddleware, getTransactions);

// Get Single Transaction
router.get("/:id", authMiddleware, getTransactionById);

// Update Transaction
router.put(
    "/:id",
    authMiddleware,
    validate(transactionSchema.fork(
        ["title", "amount", "type", "category"],
        (field) => field.optional()
    )),
    updateTransaction
);
// Delete Transaction
router.delete("/:id", authMiddleware, validate(transactionSchema), deleteTransaction);

export default router;