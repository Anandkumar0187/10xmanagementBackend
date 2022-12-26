const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    id : Number,
    class : String,
    studentsCount : Number
})

const Class = mongoose.model("class",classSchema);
module.exports = Class;