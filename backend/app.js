import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/authroutes.js";
import transactionRoutes from "./src/routes/transactionRoutes.js";
import { errorHandler, notFound } from "./src/middleware/errormiddleware.js";

const app = express();

// Middleware
const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
];
console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
console.log("Allowed Origins:", allowedOrigins);

app.use(
    cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Expense API Running",
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);


app.use(notFound);
app.use(errorHandler);

export default app;