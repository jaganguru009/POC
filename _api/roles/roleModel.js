var mongoose=require('mongoose');

var userSchema=mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true,
            unique: true
        },
        permissionGroup:
        {
            type:String,
            required:true
        },
        status:
        {
            type:number,
            required:true
        },
        created:
        {
            type:Date,
            default:Date.now
        },
        lastUpdated:
        {
            type: Date
        }
    }
);

var User=module.exports=mongoose.model('users',userSchema);
