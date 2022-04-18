const express = require('express');
const userrouters = require('./routers/userrouters');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
 
app.use(express.urlencoded({extended:true}));
app.use('/users', userrouters);

app.listen(process.env.PORT || 3000, () => console.log('listening to 3000...'));