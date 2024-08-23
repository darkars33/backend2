const mongoose = require("mongoose")

const eventsSchema = new mongoose.Schema({
        name:{
                type: String,
                required: true
        },
        date:{
                type: String,
                required: true
        },
        time:{
                type: String,
                required: true
        },
        location:{
                type: String,
                required: true,
                trim: true
        },
        description:{
                type: String,
                required: true,
                minlength: 10,
                maxlength: 500,
                trim: true
        },
        totalRegistered:{
                type: Number,
                default: 0
        }
},{
        timestamps: true
})
const Events = mongoose.model('Events', eventsSchema)
module.exports = Events