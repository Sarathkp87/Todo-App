const mongoose = require("mongoose")

const TodoSchema= new mongoose.Schema(
    {
        description:{
            type:String,
            required:true,
            unique:true
        }
    },
    {
        timestamps:true
    }
)

const Todo=mongoose.model('Todo',TodoSchema)
module.exports = Todo