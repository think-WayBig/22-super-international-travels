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

const NewPrivateFare = require('./models/newPrivateFare');
app.post('/newPrivateFare', async (req, res) => {
    try {
        let newPrivateFare = new NewPrivateFare({
            RefNo: req.body.RefNo,
            JourneyClass: req.body.JourneyClass,
            PassReqADT: req.body.PassReqADT,
            PassReqCHD: req.body.PassReqCHD,
            PassReqINF: req.body.PassReqINF,
            OriginCode: req.body.OriginCode,
            DestinationCode: req.body.DestinationCode,
            Refundable: req.body.Refundable,
            DobReqADT: req.body.DobReqADT,
            DobReqCHD: req.body.DobReqCHD,
            DobReqINF: req.body.DobReqINF,
            OriginAirportCode: req.body.OriginAirportCode,
            DestinationAirportCode: req.body.DestinationAirportCode,
            AirlineCode: req.body.AirlineCode,
            Duration: req.body.Duration,
            OriginTerminal: req.body.OriginTerminal,
            DestinationTerminal: req.body.DestinationTerminal,
            Craft: req.body.Craft,
            FareClass: req.body.FareClass,
            FareBasis: req.body.FareBasis,
            Baggage: req.body.Baggage,
            CabinBaggage: req.body.CabinBaggage,
            AirlineRemark: req.body.AirlineRemark
        });

        await newPrivateFare.save();

        console.log("Data sent successfully");

        res.status(202).send({
            message: "Data sent successfully",
            data: newPrivateFare
        });
    } catch (error) {
        // Handle other errors
        res.status(500).send({
            message: "Failed",
            error: error.message,
            data: {
                RefNo: req.body.RefNo,
                JourneyClass: req.body.JourneyClass,
                PassReqADT: req.body.PassReqADT,
                PassReqCHD: req.body.PassReqCHD,
                PassReqINF: req.body.PassReqINF,
                OriginCode: req.body.OriginCode,
                DestinationCode: req.body.DestinationCode,
                Refundable: req.body.Refundable,
                DobReqADT: req.body.DobReqADT,
                DobReqCHD: req.body.DobReqCHD,
                DobReqINF: req.body.DobReqINF,
                OriginAirportCode: req.body.OriginAirportCode,
                DestinationAirportCode: req.body.DestinationAirportCode,
                AirlineCode: req.body.AirlineCode,
                Duration: req.body.Duration,
                OriginTerminal: req.body.OriginTerminal,
                DestinationTerminal: req.body.DestinationTerminal,
                Craft: req.body.Craft,
                FareClass: req.body.FareClass,
                FareBasis: req.body.FareBasis,
                Baggage: req.body.Baggage,
                CabinBaggage: req.body.CabinBaggage,
                AirlineRemark: req.body.AirlineRemark
            }
        });
    }
})

let PORT = 5000;

app.listen(PORT, () => { console.log('API Running Successfully', `http://localhost:${PORT}`) });