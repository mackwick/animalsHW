//Dependencies
require("dotenv").config() 
const mongoose = require("mongoose")

//Connection
mongoose.connect(process.env.DATABASE_URL)

//Connection events
mongoose.connection
.on("open", () => {console.log("mongo connected")})
.on("close", () => {console.log("mongo disconnected")})
.on("error", (error) => {console.log(error)})

//Export
module.exports = mongoose