const express = require("express");

const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const productRoutes = require("./routes/productRoutes");
const stockMovementRoutes = require("./routes/stockMovementRoutes");

const authenticate = require("./middlewares/authenticate");

const app = express();

app.use(express.json());

// rotas públicas
app.use("/auth", authRoutes);

// rotas protegidas
app.use("/categories", authenticate, categoryRoutes);
app.use("/suppliers", authenticate, supplierRoutes);
app.use("/products", authenticate, productRoutes);
app.use("/stock-movements", authenticate, stockMovementRoutes);

module.exports = app;