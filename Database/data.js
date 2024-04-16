const mongoose = require("mongoose")

exports.connectDB = async () => {
            try {
                        await mongoose.connect("mongodb+srv://niteshbakhla007:4kjJhRswFFsFzIoV@cluster0.wsljlvh.mongodb.net/")

                        console.log("MongoDB Atlas connected successfully!");
            }
            catch (err) {
                        console.error("Error connecting to MongoDB Atlas:", err.message);
            }

}