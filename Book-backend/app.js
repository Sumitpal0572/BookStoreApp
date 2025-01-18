const express = require("express")
const app = express();
require("dotenv").config()
require("./conn/connect")
const User = require("./routes/user.routes")
const Books = require("./routes/book.routes")
const Favourite = require("./routes/favourite")

PORT = 2000;

app.use(express.json())
//routes
app.use("/api/v1", User)
app.use("/api/v1/", Books)
app.use("/api/v1/", Favourite)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})