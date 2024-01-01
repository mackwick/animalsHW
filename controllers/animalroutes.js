const express = require("express")
const Animal = require("../models/animalDB.js")
const { resolveInclude } = require("ejs")


//ROUTER
const router = express.Router()

//ERROR HANDLER
function errorHandler(error, res) {
    res.json(error)
}

//ROUTES

//seed route
router.get("/seed", async (req, res) => {
    await Animal.deleteMany({}).catch((error) => errorHandler(error, res)) //reset and clear whole DB
    const animals = await Animal.create([
        {species: "Acromantula", extinct: false, location: "Borneo, Scotland", lifeExpectancy: 75},
        {species: "Ashwinder", extinct: false, location: "Worldwide", lifeExpectancy: 13},
        {species: "Augury", extinct: false, location: "Ireland", lifeExpectancy: 101},
        {species: "Basilisk", extinct: false, location: "Scotland", lifeExpectancy: 600}
    ]).catch((error) => errorHandler(error, res))
    res.json(animals)
})

//index route - GET
router.get("/", async (req, res) => {
    const animals = await Animal.find({}).catch((error) => errorHandler(error, res))
    res.render("index.ejs", {animals})
})

//new route - GET (new form)
router.get("/new", (req, res) => {
    res.render("new.ejs")
})

//destroy route - DELETE (by id)
router.delete("/:id", async (req, res) => {
    await Animal.findByIdAndDelete(req.params.id).catch((error) => errorHandler(error, res))
    res.redirect("/animals")
})

//update route - PUT (updates using edit form)
router.put("/:id", async (req, res) => {
    req.body.extinct = Boolean(req.body.extinct)
    await Animal.findByIdAndUpdate(req.params.id, req.body)
    res.redirect("/animals/")
})

//create route - POST (creates using new form)
router.post("/", async (req, res) => {
    if (req.body.species != "") {
    req.body.extinct = Boolean(req.body.extinct)
    await Animal.create(req.body).catch((error) => errorHandler(error, res))}
    res.redirect("/animals")
})


//edit route - GET (edit form)
router.get("/:id/edit", async (req, res) => {
    const animal = await Animal.findById(req.params.id).catch((error) => errorHandler(error, res))
    res.render("edit.ejs", {animal})
})

//show route - GET (by id)
router.get("/:id", async (req, res) => {
    const animal = await Animal.findById(req.params.id).catch((error) => errorHandler(error, res))
    res.render("show.ejs", {animal})
})

//EXPORT ROUTER
module.exports = router