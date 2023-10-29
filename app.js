const express=require('express')
const bodyParser=require('body-parser')
const Cors=require('cors')
const mongoose=require('mongoose')
const userModel = require('./userModel')
const postModel = require('./postModel')

const app=express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(Cors())

mongoose.connect("mongodb+srv://sreelekshmisl1710:Dharithri@cluster0.y83cozw.mongodb.net/userDB?retryWrites=true&w=majority",{useNewUrlParser:true})

app.post("/regu",async(request,response)=>{
    let data=request.body
    const user=new userModel(data)
    let result=await user.save()
    if (result.name!="") {
        response.json({"status":"success"})
    } else {
        response.json({"status":"error"})
    }
})

app.post("/login",async(request,response)=>{
    let data=request.body
    let getUsername=data.username
    let getPassword=data.password
    let result=await userModel.find({username:getUsername})
    console.log(result)
    if (result.length>0) {
        console.log(getPassword)
        console.log(result[0].password)
        if (result[0].password==getPassword) {
            response.json({"status":"success","data":result[0]})
        } else {
            response.json({"status":"incorrect password"})
        }
    } else {
        
        response.json({"status":"Invalid Username"})
    }

})

app.post("/addp",async(request,response)=>{
    let data=request.body
    const addPost=new postModel(data)
    let result=await addPost.save()
    if (result.userID!="") {
        response.json({"status":"success"})
    } else {
        response.json({"status":"error"})
    }
})







app.listen(3001,()=>{
    console.log("Server is running")
})