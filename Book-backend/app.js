const express = require("express")
const app = express();
const cors = require("cors");
require("dotenv").config()
require("./conn/connect")
const User = require("./routes/user.routes")
const Books = require("./routes/book.routes")
const Favourite = require("./routes/favourite")
const Cart = require("./routes/cart")
const Order = require("./routes/order")

app.use(cors());
app.use(express.json())
//routes
app.use("/api/v1", User)
app.use("/api/v1/", Books)
app.use("/api/v1/", Favourite)
app.use("/api/v1/", Cart)
app.use("/api/v1/", Order)


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})