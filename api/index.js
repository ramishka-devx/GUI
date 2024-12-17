import express, { json } from 'express'
import morgan from 'morgan'
import createError from 'http-errors'
import dotenv from 'dotenv' ; dotenv.config();
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended :true}))
app.use(morgan('dev')); // loging all things
app.use(cors());


app.get("/", async (req,res)=>{
    res.send("NO ROOT HERE");
})


app.use(async (req,res,next) =>{
    next(createError.NotFound("FILE DOES NOT EXIST"));
})

app.use((err,req,res,next)=>{
    res.status(err.status || 500);
    res.send({
        error: {
            status : err.status || 500,
            message : err.message,
        },
    })
})

const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
    console.log(`Server is running on PORT : ${PORT}`);
});