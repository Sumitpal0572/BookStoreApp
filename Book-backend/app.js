const express = require("express")
const app = express();
require("dotenv").config()
require("./conn/connect")
const User = require("./routes/user.routes")

PORT = 2000;

app.use(express.json())
//routes
app.use("/api/v1", User)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})