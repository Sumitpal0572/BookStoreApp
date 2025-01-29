const router = require("express").Router();
const { authenticateToken } = require("./userAuth")
const Book = require("../Models/book")
const order = require("../Models/order")
const router = require("./cart")

//place-order

router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers
        const { order } = req.body
        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromdb = await newOrder.save();

            //saving order in a user model
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromdb._id },
            });

            //clearing cart

            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id },
            });
        }
        return res.json({
            status: "Success",
            message: "Order placed Successfully",
        })
    } catch (error) {
        return res.status(500).json({ message: "An Error Occured" })
    }
})


module.exports = router