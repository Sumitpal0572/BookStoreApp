const router = require("express").Router.Router();
const User = require("../Models/user")
const { authenticateToken } = require("./userAuth");

//add book to favourites

router.put("/add-book-to-fav", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers
        const userData = await User.findById(id)
        const isBookFavourite = userData.favourites.includes(bookid)
        if (isBookFavourite) {
            return res.status(200).json({ message: "Book is already in favourite" })
        }
        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } })
        return res.status(200).json({ message: "Book added to favourite" })

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
})


module.exports = router