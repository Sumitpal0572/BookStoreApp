const router = require("express").Router();
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

//remove book from favourites

router.put("/remove-book-from-fav", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers
        const userData = await User.findById(id)
        const isBookFavourite = userData.favourites.includes(bookid)
        if (isBookFavourite) {
            await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } })
        }
        return res.status(200).json({ message: "Book removed from favourite" })

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
})


// get favourite books of a particular user

router.get("/get-favourite-books", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate("favourites");
        const favouriteBooks = userData.favourites;
        return res.json({
            status: "Success",
            data: favouriteBooks,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "An error occured" })
    }
})

module.exports = router;