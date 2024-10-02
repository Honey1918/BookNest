const mongoose= require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.mongo_URL).then(
    ()=>{
        console.log('Conntected to DataBase');
    }
)
    .catch((err)=>{
        console.log('Could not connect to server' + err);
    })