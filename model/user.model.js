const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        required: true,
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},
{
    timestamps:true
}
)

module.exports = mongoose.model('User', userSchema)