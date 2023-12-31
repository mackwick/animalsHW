const express = require("express")
const Animal = require("../models/animalDB.js")


//ROUTER
const router = express.Router()


//ROUTES

//seed route
router.get("/seed", async (req, res) => {
    await Animal.removeAllListeners({}) //reset and clear whole DB
    const animals = await Animal.create([
        {name: "Acromantula", extinct: false, location: "Borneo", lifeExpectancy: 75},
        {name: "Ashwinder", extinct: false, location: "Worldwide", lifeExpectancy: 13},
        {name: "Augury", extinct: false, location: "Ireland", lifeExpectancy: 101},
        {name: "Basilisk", extinct: false, location: "Scotland", lifeExpectancy: 600}
    ])
    res.json(animals)
})


//EXPORT ROUTER
module.exports = router