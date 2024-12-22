const express = require("express")
const app = express();
const connect = require("./conn/connect")
require("dotenv").config()

PORT = 2000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})