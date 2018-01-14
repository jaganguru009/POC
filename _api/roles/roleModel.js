var mongoose=require('mongoose');

var roleSchema=mongoose.Schema(
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
            type: Date
        }
    }
);

var Role=module.exports=mongoose.model('roles',roleSchema);
