const User = require("../model/useSchema")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const secret_key = "nitesh12345"


exports.signup = async (req, res) => {
            try {
                        console.log(req.body)
                        const { username, email, password } = req.body;

                        const emailExist = await User.findOne({ email })
                        if (emailExist) return res.json({ success: false, message: `${email} is already exist ` })

                        if (password.length < 6) return res.json({ message: "Password length must be 6 or above" })

                        const hashpassword = await bcrypt.hash(password, 10)
                        const userDets = new User({
                                    username,
                                    email,
                                    password: hashpassword
                        })

                        await userDets.save()
                        return res.json({ success: true, message: "Successfully Signup!", userDets })

            } catch (error) {
                        console.log(error.message)
                        return res.json({ success: false, message: "Interval Server error" })
            }

}



exports.login = async (req, res) => {
            try {
                        const { email, password } = req.body;

                        // Check if user with provided email exists
                        const user = await User.findOne({ email });
                        if (!user) {
                                    return res.status(400).json({ success: false, message: "Email not found. Please sign up first." });
                        }

                        // Verify password
                        const isValidPassword = await bcrypt.compare(password, user.password);
                        if (!isValidPassword) {
                                    return res.status(400).json({ success: false, message: "Invalid password." });
                        }

                        // Generate JWT token
                        const token = jwt.sign({ id: user._id }, secret_key, { expiresIn: "1h" });

                        // Set token as a cookie
                        res.cookie("jwt", token, {
                                    httpOnly: true,
                                    expires: new Date(Date.now() + 3600000), // 1 hour expiration
                                    sameSite: "lax",
                                    secure: true // Use 'true' in production for secure HTTPS connections
                        });

                        // Send success response
                        return res.status(200).json({ success: true, message: "Login successful.", });
            } catch (error) {
                        console.error("Login error:", error);
                        return res.status(500).json({ success: false, message: "Internal server error." });
            }
};


exports.logout = async (req, res) => {
            try {
                        res.clearCookie("jwt")
                        return res.status(200).json({ success: false, message: "Logout Successful" })
            } catch (error) {
                        console.log(error.message)
                        return res.status(500).json({ success: false, message: "Internal server error" })
            }
}