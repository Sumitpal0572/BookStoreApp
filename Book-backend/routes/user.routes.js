const router = require("express").Router()
const User = require("../Models/user")
const bcrypt = require("bcryptjs")
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
        if (password <= 5) {
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
        const existingUser = await User.findOne(username)
        if (!existingUser) {
            res.status(400).json({ message: "Invalid Credentials" })
        }
        await bcrypt.compare(password, existingUser.password, (err, data) => {
            if (data) {
                res.status(200).json({ message: "Signin successfully" })
            } else {
                res.status(400).json({ message: "Invalid Credentials" })

            }
        })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" })
    }
})

module.exports = router;