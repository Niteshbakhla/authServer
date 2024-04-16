const express = require("express");
const { connectDB } = require("./Database/data");
const router = require("./Router/router");
const app = express();
const cookieparser = require("cookie-parser")
const cors = require("cors")

const PORT = 5000
connectDB()
app.use(cookieparser())

app.use(cors({
            origin: "http://localhost:5173",
            credentials: true
}))
app.use(express.json())
app.use("/api", router)




app.listen(PORT, () => {
            console.log("Server is running !");
});
