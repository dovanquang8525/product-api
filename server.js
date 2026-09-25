require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(express.json());

app.use("/api/products", productRoutes);

// Health Check
app.get("/health", (req, res) => {
    if (mongoose.connection.readyState === 1) {
        return res.status(200).json({
            status: "UP",
            database: "CONNECTED",
        });
    }

    return res.status(503).json({
        status: "DOWN",
        database: "DISCONNECTED",
    });
});

// MongoDB Connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error);
    });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
