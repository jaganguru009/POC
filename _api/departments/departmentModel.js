var mongoose=require('mongoose');

var departmentSchema=mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true,
            unique: true
        },
        description:
        {
            type:String,
            required:true
        },
        permistionGroupId:
        {
            type:String,
            required:true
        }
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

var Department=module.exports=mongoose.model('departments',departmentSchema);
