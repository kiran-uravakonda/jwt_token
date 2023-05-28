var express=require('express');
var jwt=require('jsonwebtoken');
var app=express();
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.post('/data',verifyToken,(req,res)=>{
    jwt.verify(tokenId,'capgemini',(err,result)=>{
        if(err)
        {
            res.sendStatus(403)
        }
        else
        {
            res.send(result)
        }
    })
})


app.post('/login',(req,res)=>{
    var data={
        id:1,
        name:"kiran",
        gmail:"kiran@gmail.com"
    }
    jwt.sign(data,'capgemini',(err,token)=>{
        if(err)
        {
            res.sendStatus(300)
        }
        else
        {
            res.send({
                token
            })
        }
    })
})


function verifyToken(req,res,next)
{
    var bearerHeader=req.headers.authorization;
    console.log(bearerHeader)
    if(bearerHeader!=null)
     {

          var tokenValue=bearerHeader.split(" ")[0]
          tokenId=tokenValue
          console.log(tokenId)
          next()
    }
    else
    {
        res.sendStatus(401)
    }
}






app.listen(4000,()=>{
    console.log("server running on 4000m port")
})