const express=require('express')
const app=express()
port=3000
app.listen(port,()=>{
    console.log(`Listening to port ${port}`)
})

app.use(express.json()) //middleware for body to json conversion

app.get('/',(req,res)=>{
    const {name,age}=req.query //localhost:3000/?name=ashiq&age=22
    res.send(`${name},${age}`)
})

app.post('/contact',(req,res)=>{
    const {name,age}=req.body 
    if(!name){
        res.status(422).json({message:  `Name adikkada manda`})
    }
    res.status(200).json({message:`Age of ${name} is ${age}`})
})