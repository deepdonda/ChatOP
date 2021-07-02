const express =require('express')
const app=express()
const http=require('http').createServer(app)
const Port=3000

http.listen(Port,()=>{
    console.log("server runing");
})
app.use(express.static(__dirname+'/public'))
app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/index.html')
})

const io=require('socket.io')(http)
io.on('connection',(socket)=>{
    console.log("connected")
    socket.on('message',(massage)=>{
        socket.broadcast.emit('message',massage)
    })
})

