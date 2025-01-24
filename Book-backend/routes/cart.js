const router = require("express").Router()
const User = require("../Models/user");
const { authenticateToken } = require("./userAuth");

//put add to cart

router.put("/add-to-cart", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers
        const userData = await User.findById(id);
    } catch (error) {

    }
})

module.exports = router