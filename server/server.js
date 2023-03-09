const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config()

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.PRIVATE_KEY
});


const openai = new OpenAIApi(configuration);


const app = express();
app.use(cors())
app.use(bodyParser.json())


const PORT = 5003;


app.post('/', async(req,res) => 
{ 
    const {message} = req.body;
    console.log(message)
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: `${message}`}],
      });
     console.log(completion.data.choices[0].message.content)

      res.json(
        {
            message: completion.data.choices[0].message.content

        }
      )






})


app.listen(PORT, function(){ 
    console.log(PORT)

})


