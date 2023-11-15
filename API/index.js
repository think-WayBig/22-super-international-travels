let express = require('express');
let app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require("mongoose");

require('dotenv').config();
app.use(bodyParser.json());
app.use(cors());

try {
    mongoose.connect(
        process.env.MONGODB_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );

    console.log('MongoDB connected successfully');
} catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
}

app.get('/', (req, res) => {
    res.send({
        message: "Welcome"
    });
});

const Auth = require('./models/auth');
app.post('/newUser', async (req, res) => {
    try {
        // Check if the email already exists
        const existingUser = await Auth.findOne({ Mail: req.body.Mail });

        if (existingUser) {
            // Email already exists, send a response indicating the conflict
            return res.status(409).send({
                message: "Email already exists",
                data: existingUser
            });
        }

        // Email does not exist, create and save a new user
        let auth = new Auth({
            Mail: req.body.Mail,
            Password: req.body.Password,
        });

        await auth.save();

        console.log("Data sent successfully");

        res.status(202).send({
            message: "Data sent successfully",
            data: auth
        });
    } catch (error) {
        // Handle other errors
        res.status(500).send({
            message: "Failed",
            error: error.message,
            data: {
                Mail: req.body.Mail,
                Password: req.body.Password,
            }
        });
    }
});

app.get('/user', async (req, res) => {
    try {
        let data = await Auth.findOne({ Mail: req.body.Mail });
        res.json({
            data: data
        })
    } catch (error) {
        RestError.send({
            message: "Failed",
            error: error.message,
        })
    }
})

let PORT = 5000;

app.listen(PORT, () => { console.log('API Running Successfully', `http://localhost:${PORT}`) });