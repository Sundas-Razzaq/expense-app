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

//get transaction summary
export const getTransactionSummary = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const summary = await Transaction.aggregate([
        {
            $match: {
                user: userId,
            },
        },
        {
            $group: {
                _id: "$type",
                total: {
                    $sum: "$amount",
                },
            },
        },
    ]);

    let totalIncome = 0;
    let totalExpense = 0;

    summary.forEach((item) => {
        if (item._id === "income") {
            totalIncome = item.total;
        }

        if (item._id === "expense") {
            totalExpense = item.total;
        }
    });

    const balance = totalIncome - totalExpense;

    // Get latest 5 transactions
    const recentTransactions = await Transaction.find({
        user: userId,
    })
        .sort({ date: -1 })
        .limit(5);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalIncome,
                totalExpense,
                balance,
                recentTransactions,
            },
            "Transaction summary fetched successfully."
        )
    );
});
// Get Category Analytics
export const getCategoryAnalytics = asyncHandler(async (req, res) => {
    const categoryAnalytics = await Transaction.aggregate([
        {
            $match: {
                user: req.user._id,
                type: "expense",
            },
        },
        {
            $group: {
                _id: "$category",
                totalAmount: {
                    $sum: "$amount",
                },
                transactionCount: {
                    $sum: 1,
                },
            },
        },
        {
            $sort: {
                totalAmount: -1,
            },
        },
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            categoryAnalytics,
            "Category analytics fetched successfully."
        )
    );
});

// Get Monthly Analytics
export const getMonthlyAnalytics = asyncHandler(async (req, res) => {
    const monthlyAnalytics = await Transaction.aggregate([
        {
            $match: {
                user: req.user._id,
            },
        },
        {
            $group: {
                _id: {
                    year: { $year: "$date" },
                    month: { $month: "$date" },
                    type: "$type",
                },
                totalAmount: {
                    $sum: "$amount",
                },
            },
        },
        {
            $sort: {
                "_id.year": 1,
                "_id.month": 1,
            },
        },
    ]);

    const result = {};

    monthlyAnalytics.forEach((item) => {
        const key = `${item._id.year}-${String(item._id.month).padStart(2, "0")}`;

        if (!result[key]) {
            result[key] = {
                year: item._id.year,
                month: item._id.month,
                income: 0,
                expense: 0,
            };
        }

        if (item._id.type === "income") {
            result[key].income = item.totalAmount;
        }

        if (item._id.type === "expense") {
            result[key].expense = item.totalAmount;
        }
    });

    return res.status(200).json(
        new ApiResponse(
            200,
            Object.values(result),
            "Monthly analytics fetched successfully."
        )
    );
});

// Get Overall Statistics
export const getStatistics = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const [
        totalTransactions,
        highestExpense,
        highestIncome,
        expenseStats,
        incomeStats,
    ] = await Promise.all([
        Transaction.countDocuments({
            user: userId,
        }),

        Transaction.findOne({
            user: userId,
            type: "expense",
        }).sort({ amount: -1 }),

        Transaction.findOne({
            user: userId,
            type: "income",
        }).sort({ amount: -1 }),

        Transaction.aggregate([
            {
                $match: {
                    user: userId,
                    type: "expense",
                },
            },
            {
                $group: {
                    _id: null,
                    averageExpense: {
                        $avg: "$amount",
                    },
                    totalExpense: {
                        $sum: "$amount",
                    },
                },
            },
        ]),

        Transaction.aggregate([
            {
                $match: {
                    user: userId,
                    type: "income",
                },
            },
            {
                $group: {
                    _id: null,
                    averageIncome: {
                        $avg: "$amount",
                    },
                    totalIncome: {
                        $sum: "$amount",
                    },
                },
            },
        ]),
    ]);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                totalTransactions,

                highestExpense,

                highestIncome,

                averageExpense:
                    expenseStats[0]?.averageExpense ?? 0,

                averageIncome:
                    incomeStats[0]?.averageIncome ?? 0,

                totalExpense:
                    expenseStats[0]?.totalExpense ?? 0,

                totalIncome:
                    incomeStats[0]?.totalIncome ?? 0,
            },
            "Statistics fetched successfully."
        )
    );
});