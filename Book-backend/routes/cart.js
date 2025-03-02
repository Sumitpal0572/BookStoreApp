const router = require("express").Router()
const User = require("../Models/user");
const { authenticateToken } = require("./userAuth");

//put add to cart

router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers
        const userData = await User.findById(id);
        const isBookinCart = userData.cart.includes(bookid);
        if (isBookinCart) {
            return res.json({
                status: "Success",
                message: "Book is already in Cart",
            });
        }
        await User.findByIdAndUpdate(id, {
            $push: { cart: bookid },
        });

        return res.json({
            status: "Success",
            message: "Book Added to cart",
        });
    } catch (error) {
        return res.status(500).json({ message: "An occur Occured" });
    }
})

// remove the book from cart

router.put("/remove-from-cart/:bookid", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers
        const { id } = req.headers
        await User.findByIdAndUpdate(id, {
            $pull: { cart: bookid },
        });

        return res.json({
            status: "Success",
            message: "Book remove from Cart",
        });
    } catch (error) {
        return res.status(500).json({ message: "An occur Occured" });
    }
})

// get cart of particular user

router.get("/get-user-cart", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart = userData.cart.reverse();
        return res.json({
            status: "Success",
            data: cart,
        })
    } catch (error) {
        return res.status(500).json({
            message: "An error occured"
        })
    }
})

module.exports = router