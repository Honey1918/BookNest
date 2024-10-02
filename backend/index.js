const express =require('express');

const port= 1234;
const app= express();
const bodyParser=require('body-parser');

require('./db');
require('./models/User');
const authRoutes= require('./routes/authroutes');
const requireToken= require('./Middleware/Authtokereq');

app.use(bodyParser.json());
app.use(authRoutes);

app.get('/', requireToken, (req, res) => {
    console.log(req.user);
    res.send(req.user);
});
app.post('/signup', (req, res)=>{
    res.send('This is sign up page');
})
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
});