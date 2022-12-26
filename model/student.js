const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    id : Number,
  name : String,
  classId : {type : mongoose.Schema.Types.ObjectId, ref: "Class"}  
})

const Student = mongoose.model("student",studentSchema);
module.exports = Student;