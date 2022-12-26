const express = require('express');
const app = express();
const port = 8080;
const Class = require('./model/class');
const Student = require('./model/student');
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:/10xManagement",()=>{
    console.log("database connected");
})

app.use(express.json())

app.post('/v1/myClass',async(req,res)=>{
    const data = await Class.create({
        id : await Class.find().count()+1,
        class : req.body.class,
        studentsCount : req.body.studentsCount
    });
    res.status(201).json({
        id : data.id,
        _id : data._id
    })
})
app.post('/v1/myClass/:myClassId/students',async(req,res)=>{
    const data = await Student.create({
        id : await Student.find().count()+1,
        name : req.body.name,
    });
    res.status(201).json({
        id : data.id
    })
})

app.get('/v1/myClass',async(req,res)=>{
    const classes = await Class.find();
    res.status(201).json({
        classes : classes.map((data)=>{
            return {
                id : data.id,
                class : data.class,
                studentsCount : data.studentsCount
            }
        })
    })
})
app.get('/v1/myClass/:myClassId',async(req,res)=>{
    const classes = await Class.findOne({id:req.params.myClassId});
    if(classes){
        res.status(200).json({
        
            id : classes.id,
            class : classes.class,
            studentsCount : classes.studentsCount

    })
    }else{
        res.status(404).json({
            error : "there is no class at that id"
        })
    }
})

app.get('/v1/myClass/:myClassId/students',async(req,res)=>{
    const classes = await Class.findOne({id:req.params.myClassId});
    const students = await Student.find();
    if(classes){
        res.status(200).json({
        data : students.map((item)=>{
            return {
                name : item.name,
                classid : req.params.myClassId,
                studentsId : item.id
            }
        })
    })
    }else{
        res.status(404).json({
            error : "there are no student in this class"
        })
    }
})

app.get('/v1/myClass/:myClassId/students/:studentId',async(req,res)=>{
    const classes = await Class.findOne({id:req.params.myClassId});
    if(classes){
        const data = await Student.findOne({id:req.params.studentId})
        res.status(200).json({
            name : data.name,
            classId : req.params.myClassId,
            studentId : data.id

    })
    }else{
        res.status(404).json({
            error : "there is no class at that id"
        })
    }
})

app.put('/v1/myClass/:myClassId/students/:studentId',async(req,res)=>{
    const classes = await Class.findOne({id:req.params.myClassId});
    if(classes){
        const data = await Student.updateOne({id:req.params.studentId},{name : req.body.name})
        res.status(200).json({
            status : "success"
    })
    }else{
        res.status(404).json({
            error : "there is no student at that id"
        })
    }
})

app.delete('/v1/myClass/:myClassId',async(req,res)=>{
    let classes = await Class.findOne({id: req.myClassId})
    if(classes){
        await Class.deleteOne({id : req.params.myClassId});
        res.status(204).json({
        })
    }else{
        res.status(404).json({
            error: "There is no task at that id"

        })
    }
    
})
app.delete('/v1/myClass/:myClassId/students/:studentId',async(req,res)=>{
    let classes = await Class.findOne({id: req.myClassId})
    if(classes){
        await Student.deleteOne({id : req.params.studentId});
        res.status(204).json({
        })
    }else{
        res.status(404).json({
            error: "There is no task at that id"

        })
    }
    
})

app.listen(port,()=>{
    console.log(`app listens at ${port}`);
})