//DEPENDENCIES
require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const methodOverride = require("method-override")
const AnimalRouter = require("./controllers/animalroutes.js")

const app = express()

//MIDDLEWARE
app.use(morgan("dev"))
app.use(methodOverride("_method"))
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))


//ROUTES AND ROUTERS
app.get("/", (req, res) => {
    res.send("Server is working.")
})

app.use("/animals", AnimalRouter)

//SERVER LISTENER
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}.`)
})