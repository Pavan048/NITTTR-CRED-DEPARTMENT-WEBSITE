const mongoose = require("mongoose");


const eventsSchema = new mongoose.Schema({
    eventsImage : {
        type:String,
        required:true,
    },
    eventsTitle : {
        type : String,
        required:true,
    },
    eventsTimings : {
        type : String,
        required : true,
    },
    eventsDate :{
        type : String,
        required : true,
    },
    eventsMonth :{
        type : String,
        required : true,
    },
    eventsDetails : {
        type : String,
        required : true,
    },
    eventsSpeaker : {
        type : String,
        required : true,
    },
    created : {
        type: Date,
        required : true,
        default : Date.now,
    },


});

module.exports = mongoose.model('Events' , eventsSchema );