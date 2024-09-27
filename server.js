import express from "express";  
import mongoose from "mongoose";  
import Cors from "cors";  
import Cards from "./dbCards.js";  

// App Config   
const app = express();  
const port = process.env.PORT || 8001;  

const connection_url = `mongodb+srv://sowndharrks221:Jskplk2002%40@cluster0.e9xih.mongodb.net/mydatabase?retryWrites=true&w=majority`;  

// Middleware to parse JSON body  
app.use(express.json());  
app.use(Cors());  

// DB Config  
mongoose.connect(connection_url, {})  
  .then(() => console.log('MongoDB connected...'))  
  .catch(err => console.error('MongoDB connection error:', err));  

// API Endpoints   
app.get("/", (request, response) => response.status(200).send("Hello DB"));  

app.post("/tinder/cards", async (request, response) => {  
    const dbCard = request.body;  

    try {  
        const data = await Cards.create(dbCard);  
        response.status(201).send(data);  
    } catch (err) {  
        response.status(500).send(err);  
    }  
});  

app.get("/tinder/cards", async (request, response) => {  
    try {  
        const data = await Cards.find();  
        response.status(200).send(data);  
    } catch (err) {  
        response.status(500).send(err);  
    }  
});  


// Listener  
app.listen(port, () => console.log(`Listening on localhost: ${port}`));