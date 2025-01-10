const router = require("express").Router()
const User = require("../Models/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { authenticateToken } = require("./userAuth")

//sign-up route
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body
        if (username.length < 4) {
            return res.status(400).json({ message: "Username should be greater then 3" })
        }

        // check existing user

        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exist" })
        }

        // check existing Email

        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exist" })
        }

        // check password length
        if (password.length <= 5) {
            return res.status(400).json({ message: "password should be greater then 4" })
        }

        const hasspass = await bcrypt.hash(password, 10)

        //add new user

        const newUser = new User({ username: username, email: email, password: hasspass, address: address });
        await newUser.save()
        return res.status(200).json({ message: 'SignUp successfully' })

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
})

//sign-in

router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body

        const existingUser = await User.findOne({ username })
        if (!existingUser) {
            res.status(400).json({ message: "Invalid Credentials" })
        }
        await bcrypt.compare(password, existingUser.password, (err, data) => {
            if (data) {
                const authClaim = [{
                    name: existingUser.username
                }, { role: existingUser.role }]
                const token = jwt.sign({ authClaim }, "bookstore0572", { expiresIn: "30d" })
                res.status(200).json({ id: existingUser._id, role: existingUser.role, token: token })
            } else {
                res.status(400).json({ message: "Invalid Credentials" })
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
})

// get-user-information

router.get("/get-user-information", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers
        const data = await User.findById(id).select("-password")
        return res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
})

//update-address

router.put("/update-address", authenticateToken, async (requestAnimationFrame, res) => {
    try {
        const { id } = req.headers
        const { address } = req.body;
        await User.findByIdAndUpdate(id, { address: address })
        return res.status(200).json({ message: "Address Updated Successfully" })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
})

module.exports = router;