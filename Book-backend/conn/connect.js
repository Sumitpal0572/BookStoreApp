const mongoose = require("mongoose");
const MONGO_URI = "mongodb://localhost:27017/bookstore"

const connect = async () => {
    try {
        await mongoose.connect(`${MONGO_URI}`)
        console.log("Mongodb is Connected Successfully");
    } catch (error) {
        console.log(error.message)
    }
}
connect()
module.exports = connect
