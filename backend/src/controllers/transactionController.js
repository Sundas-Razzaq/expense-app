import Transaction from "../models/Transaction.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

// Create Transaction
export const createTransaction = asyncHandler(async (req, res) => {
    const { title, amount, type, category, description, date } = req.body;

    const transaction = await Transaction.create({
        user: req.user._id,
        title,
        amount,
        type,
        category,
        description,
        date,
    });

    return res.status(201).json(
        new ApiResponse(
            201,
            transaction,
            "Transaction created successfully."
        )
    );
});

// Get All Transactions
export const getTransactions = asyncHandler(async (req, res) => {
    const transactions = await Transaction.find({
        user: req.user._id,
    }).sort({ date: -1 });

    return res.status(200).json(
        new ApiResponse(
            200,
            transactions,
            "Transactions fetched successfully."
        )
    );
});

// Get Single Transaction
export const getTransactionById = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findOne({
        _id: req.params.id,
        user: req.user._id,
    });

    if (!transaction) {
        throw new ApiError(404, "Transaction not found.");
    }

    return res.status(200).json(
        new ApiResponse(
            200,
            transaction,
            "Transaction fetched successfully."
        )
    );
});

// Update Transaction
export const updateTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findOne({
        _id: req.params.id,
        user: req.user._id,
    });

    if (!transaction) {
        throw new ApiError(404, "Transaction not found.");
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    return res.status(200).json(
        new ApiResponse(
            200,
            updatedTransaction,
            "Transaction updated successfully."
        )
    );
});

// Delete Transaction
export const deleteTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findOne({
        _id: req.params.id,
        user: req.user._id,
    });

    if (!transaction) {
        throw new ApiError(404, "Transaction not found.");
    }

    await transaction.deleteOne();

    return res.status(200).json(
        new ApiResponse(
            200,
            null,
            "Transaction deleted successfully."
        )
    );
});