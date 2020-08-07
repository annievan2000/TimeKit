const express = require('express'); 
const cors = require('cors'); 
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; 

app.use(cors()); 
app.use(express.json()); 

const url = process.env.MONGO_URL;
mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true}); 

const connectDB = mongoose.connection; 
connectDB.once('open', ()=> {
    console.log('MongoDB connected'); 
})

app.listen(port, () => {
    console.log(`server is running: ${port}`);
});