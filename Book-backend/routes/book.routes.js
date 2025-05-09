const router = require("express").Router()
const User = require("../Models/user")
const Book = require("../Models/book")
const jwt = require("jsonwebtoken")
const { authenticateToken } = require("./userAuth")

//add book :- admin

router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res.status(400).json({ message: "You do not have access" })
        }

        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        await book.save()
        res.status(200).json({ message: "Book saved Succesfully" })
    } catch (error) {
        res.status(500).json({ message: "Interval Server Error" })
    }
})

//update-book 

router.put("/update-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        })
        return res.status(200).json({ message: "Book Updated Successfully" })
    } catch (error) {
        res.status(500).json({ message: "An Error Occured!" })

    }
})

//delete book - admin 

router.delete("/delete-book", authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "Book deleted successfully!" })
    } catch (error) {
        res.status(500).json({ message: "An Error Occured!" })

    }
})

// get all books 
router.get("/get-book", async (req, res) => {
    try {
        const books = await Book.find().sort({ created: -1 })
        return res.json({ status: 'success', data: books })
    } catch (error) {
        return res.status(500).json({ message: "An error occurred" })
    }
})


// get recently added books

router.get("/get-recent-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ created: -1 }).limit(4)
        return res.json({ status: 'success', data: books })
    } catch (error) {
        return res.status(500).json({ message: "An error occurred" })
    }
})

// get book by id

router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.json({ status: "success", data: book })
    } catch (error) {
        return res.json({ mesaage: "An error Occurred" })
    }
})

module.exports = router