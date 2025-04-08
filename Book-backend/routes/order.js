const router = require("express").Router();
const { authenticateToken } = require("./userAuth")
const Book = require("../Models/book")
const Order = require("../Models/order")
const User = require("../Models/user")

//place-order

router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

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

// get order history of particular User

router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" },
        });

        const orderData = userData.orders.reverse();
        return res.json({
            status: "Success",
            data: orderData,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An Error occured" })
    }
})

// get all orders -- admin
router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find()
            .populate({
                path: "book",
            })
            .populate({
                path: "user",
            })
            .sort({ createdAt: -1 });
        return res.json({
            status: "Success",
            data: userData,
        });
    } catch (error) {
        return res.status(500).json({ message: "An Error occured" })
    }
})

//update orders -- admin
router.put("/update-status/:id", authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate(id, { status: req.body.status });
        return res.json({
            status: "Success",
            message: "Status Updated Successfully",
        })
    } catch (error) {
        return res.status(500).json({ message: "An Error Occured" })
    }
})
module.exports = router