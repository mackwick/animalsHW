const mongoose = require(./connection.js)

//Schema
const animalSchema = new mongoose.Schema({
    species: String,
    extinct: Boolean,
    location: String,
    lifeExpectancy: Number
} {
    timestamps: true
})

//Animal Model 
//Singular model - a category of things; model function("Name of collection", what Schema to use to enforce model)
const Animal = mongoose.model("Animal", animalSchema)

//Export
module.exports = Animal

