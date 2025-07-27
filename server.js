// Configs
require("dotenv").config();

// Imports
const express = require("express");
const dbConnection = require("./config/dbConnection");
const app = express();
const URL = process.env.MONGO_DB_URL;
const PORT = process.env.PORT;

// DB Connection
dbConnection(URL);

// Routes Import
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/private/admin/products");
const orderRoutes = require("./routes/private/user/orderRoutes");
const userRoutes = require("./routes/private/admin/userRoutes");
const taskRoutes = require("./routes/task");
const globalErrorHandler = require("./middlewares/globalErrorHandler");

// Middle Ware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);
app.use("/task", taskRoutes);

app.use(globalErrorHandler);

app.listen(PORT, () => console.log(`Server is started on PORT: ${PORT}`));
