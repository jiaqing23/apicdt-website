import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import { port , mongoConnectionString} from "./config.js";

import registerRoutes from './routes/register.js';
import registerTestRoutes from './routes/registerTest.js';
import starwarsRoutes from './routes/starwars.js';
import starwarssgRoutes from './routes/starwarssg.js';

const app = express();
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.use(cors());
 
app.use('/register',registerRoutes);
app.use('/registerTest',registerTestRoutes);
app.use('/starwars',starwarsRoutes);
app.use('/starwarssg',starwarssgRoutes);


mongoose.connect(mongoConnectionString,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
    useCreateIndex: true
},(err)=>{
    if(err)
    {
        console.log(err)
    }
    else
    {
        app.listen(port, () => console.log(`Server Running on Port: http://localhost:${port}`))
    }
})

