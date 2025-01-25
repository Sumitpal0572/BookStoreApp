const router = require("express").Router()
const User = require("../Models/user");
const { authenticateToken } = require("./userAuth");

//put add to cart

router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers
        const userData = await User.findById(id);
        const isBookfavourited = userData.cart.includes(bookid);
        if (isBookfavourited) {
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

module.exports = router