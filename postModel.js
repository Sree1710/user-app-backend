const mongoose=require('mongoose')
const postModel=mongoose.model("posts",mongoose.Schema(
    {
        userID:{type:String,required:true},
        postTitle:String,
        postDesc:String,
        postCreateDate:String
    }
))
module.exports=postModel