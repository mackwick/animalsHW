const express = require("express")
const Animal = require("../models/animalDB.js")


//ROUTER
const router = express.Router()

//ERROR HANDLER
function errorHandler(error, res) {
    res.json(error)
}

//ROUTES

//seed route
router.get("/seed", async (req, res) => {
    await Animal.deleteMany({}) //reset and clear whole DB
    const animals = await Animal.create([
        {species: "Acromantula", extinct: false, location: "Borneo, Scotland", lifeExpectancy: 75},
        {species: "Ashwinder", extinct: false, location: "Worldwide", lifeExpectancy: 13},
        {species: "Augury", extinct: false, location: "Ireland", lifeExpectancy: 101},
        {species: "Basilisk", extinct: false, location: "Scotland", lifeExpectancy: 600}
    ])
    res.json(animals)
})

//index route - GET
router.get("/", async (req, res) => {
    const animals = await Animal.find({}).catch((error) => errorHandler(error, res))
    res.render("index.ejs", {animals})
})

//new route - GET (new form)


//destroy route - DELETE (by id)


//update route - PUT (updates using edit form)


//create route - POST (creates using new form)


//edit route - GET (edit form)


//show route - GET (by id)
router.get("/:id", async (req, res) => {
    const animal = await Animal.findById(req.params.id)
    res.render("show.ejs", {animal})
})


//EXPORT ROUTER
module.exports = router