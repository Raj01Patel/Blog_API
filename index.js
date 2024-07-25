const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute")
const commentRoute = require("./routes/commentRoute")


dotenv.config();

const app = express();

app.use(express.json());

mongoose.
    connect(process.env.DATABASE_URI)
    .then(() => console.log("DB Connected Successfully"))
    .catch((err) => console.log("Error connecting DB", err));

    app.use("/auth",userRoute)
    app.use("/posts",postRoute)
    app.use("/comments",commentRoute)

app.listen(10000, () => {
    console.log("Server is up and running at port 10000");
})