import express from "express";

import {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction,
    getTransactionsSummary,
} from "../controllers/transactionController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import validate from "../middleware/validate.js";
import { transactionSchema } from "../validations/transactionValidation.js";

const router = express.Router();

router.post("/", authMiddleware, validate(transactionSchema), createTransaction);

router.get("/", authMiddleware, getTransactions);

router.get("/summary", authMiddleware, getTransactionSummary);

router.get("/:id", authMiddleware, getTransactionById);

router.put(
    "/:id",
    authMiddleware,
    validate(transactionSchema.fork(
        ["title", "amount", "type", "category"],
        (field) => field.optional()
    )),
    updateTransaction
);
router.delete("/:id", authMiddleware, validate(transactionSchema), deleteTransaction);

export default router;