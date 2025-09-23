import express from "express"
import userRoutes from "./src/routes/userRoute.js"
import db from "./src/utility/db.js"
import cors from 'cors'
import dotenv from "dotenv"
dotenv.config();


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:["http://localhost:5173","https://profilegrid-pi.vercel.app"],
    methods:["GET","POST","PUT","DELETE"],
    allowedHeaders:["Content-Type"]
}))
app.use((req,res,next)=>{
    console.log("middleware runs")
    next();
});

app.use("/users",userRoutes)

// app.get("/users",(req,res)=>{
//     res.status(200).json({
//         id:1,name :"altaf"
//     });
// })

// app.post("/user",(req,res)=>{
//     const {id, name } = req.body
//     return res.status(201).json({
//         id, name
//     })
// })

// app.get("/user/:id", (req,res)=>{
//     const id = req.params.id

//     return res.status(200).json({
//         id:id,name:"sheikh"
//     })
// })

// app.delete("/user/:id",(req,res)=>{
//     return res.send("user deleted ")
// })

// app.put("/user/:id",(req,res)=>{
//     const {id, name} = req.body
//     return res.status(200).send(`user id is ${id} and name is ${name}`)
// })

// app.post("/status/:id/user",(req,res)=>{
//     const {name} = req.body
//     const {id} = req.params
//     const {namee} = req.query
//     res.status(201).send(id + name + namee);
// });

app.listen(process.env.PORT,()=>{
    console.log("server is running");
    db();
})
// sendstatus
// send 
// status  end
// json
// end