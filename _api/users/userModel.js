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
        name:
        {
            type:String,
            required:true
        },
        email:
        {
            type:String,
            required:true
        },
        phone:
        {
            type:Number,
            required:true
        },
        empCode:
        {
            type:String,
            required:true
        },
        roleId:
        {
            type:String,
            required:true
        },
        departmentId:
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
            type:Date 
        }
    }
);

var User=module.exports=mongoose.model('users',userSchema);
