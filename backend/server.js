const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connectDB
connectDB();

// Routes

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/notes", require("./routes/notesRoutes"));
// Custom Middlewares
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server is Running on PORT=${PORT}`));
