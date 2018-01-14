var mongoose=require('mongoose');

var userSchema=mongoose.Schema(
    {
        userName:
        {
            type:String,
            required:true,
            unique: true
        },
        password:
        {
            type:String,
            required:true
        },
        created:
        {
            type:Date,
            default:Date.now
        },
        userGroupId:
        {
            type:String,
            required:true
        }
    }
);

var User=module.exports=mongoose.model('users',userSchema);
