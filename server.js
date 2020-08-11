const express = require("express");
const app = express();

const userRoute = require("./Routes/user");
const authRoute = require("./Routes/auth");
const connectDB = require("./config/db");
app.use(express.json({ extended: false }));
connectDB();

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
