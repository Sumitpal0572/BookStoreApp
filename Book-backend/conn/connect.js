const mongoose = require("mongoose");
const connect = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`)
        console.log("Mongodb is Connected Successfully");
    } catch (error) {
        console.log(error.message)
    }
}
connect()
module.exports = connect
