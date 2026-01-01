import express from "express"
import OpenAI from "openai"
import 'dotenv/config'

//Creating Express App
const app = express();
const PORT = 3000;

// Middleware that converts frontend JSON data to js object
app.use(express.json());

// Allows backend to server frontend files
app.use(express.static("public"))

// Creating OpenAI Client
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

//Creating API Route
app.post("/explain", async(req, res)=>{
    // Extracting the code sent from the frontend JSON
    const {code} = req.body;

    const prompt = `Think that I am a beginner and explain the foloowing code in simple terms: ${code}`

    // Call OpenAI
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: prompt}]
    });

    // Send AI's explanation back to frontend as JSON
    res.json({
        explanation: response.choices[0].message.content
    });
})

// Starting the server
app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT}`)
})