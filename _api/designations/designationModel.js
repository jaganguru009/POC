var mongoose=require('mongoose');

var designationSchema=mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true,
            unique: true
        }, 
        // roleId:
        // {
        //     type:String,
        //     required:true 
        // }, 
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

var Designation=module.exports=mongoose.model('designations',designationSchema);
