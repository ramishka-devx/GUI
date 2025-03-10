const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const createError =  require('http-errors');
const authRouter = require('./routes/authRoutes');
const orderRouter = require('./routes/orderRoutes');
const storeRouter = require('./routes/storeRoutes');
const profileRouter = require('./routes/profileRoutes.js');
const adminRouter = require('./routes/adminRoutes.js');
const emailRouter = require('./helpers/email.js');

dotenv.config();


const app = express()

app.use(express.json())
app.use(express.urlencoded({extended :true}))
app.use(morgan('dev')); // loging all things
app.use(cors());



app.get("/", async (req,res)=>{
    res.send("NO ROOT HERE");
})

app.use('/auth',authRouter);
app.use('/store',storeRouter);
app.use('/orders', orderRouter);
app.use('/profile', profileRouter);
app.use('/admin', adminRouter);
app.use('/email',emailRouter );

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