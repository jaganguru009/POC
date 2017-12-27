var mongoose=require('mongoose');

var tileSchema=mongoose.Schema(
    {
        tileName:
        {
            type:String, 
        },
        tileText:
        {
            type:String,
            required:true
        },
        userGroupId:
        {
            type:String,
            required:true
        },
        created:
        {
            type:Date,
            default:Date.now
        }
    }
);

var Tile=module.exports=mongoose.model('tiles',tileSchema);
