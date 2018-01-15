var mongoose=require('mongoose');

var roomSchema=mongoose.Schema(
    {
        roomNumber:
        {
            type:String,
            required:true,
            unique: true
        },
        roomType:
        {
            type:String,
            required:true
        },
        floor:
        {
            type:String,
            required:true
        },
        wing:
        {
            type:String,
            required:true
        },
        maxPeople:
        {
            type:Number,
            required:true
        },
        description:
        {
            type:String,
            required:true
        },
        maxIpads:
        {
            type:Number,
            required:true
        },
        status:
        {
            type:Boolean,
            required:true
        },
        created:
        {
            type:Date,
            default:Date.now
        },
        lastUpdated:
        {
            type:Date 
        },
    }
);

var Room=module.exports=mongoose.model('rooms',roomSchema);
