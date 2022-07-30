const express = require("express");
require("dotenv").config();
const app = express();

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server is Running on PORT=${PORT}`));
