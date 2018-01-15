var mongoose=require('mongoose');

var deviceSchema=mongoose.Schema(
    {
        UDID:
        {
            type:String,
            required:true,
            unique: true
        },
        status:
        {
            type:Boolean,
            required:true
        },
        deviceNumber:
        {
            type:String,
            required:true
        },
        deviceToken:
        {
            type:String,
            required:true
        },
        roomNumber:
        {
            type:String
        },
        created:
        {
            type:Date,
            default:Date.now
        }, 
        lastUpdated:
        {
            type:Date 
        }
    }
);

var Device=module.exports=mongoose.model('devices',deviceSchema);
