const mongoose = require("mongoose");

const newPrivateFare = new mongoose.Schema({
    RefNo: {
        type: String,
        required: true,
        unique: true
    },
    JourneyClass: {
        type: String,
        required: true,
        default: 'default'
    },
    PassReqADT: {
        type: String,
        required: true,
        default: 'default'
    },
    PassReqCHD: {
        type: String,
        required: true,
        default: 'default'
    },
    PassReqINF: {
        type: String,
        required: true,
        default: 'default'
    },
    OriginCode: {
        type: String,
        required: true,
        default: 'default'
    },
    DestinationCode: {
        type: String,
        required: true,
        default: 'default'
    },
    Refundable: {
        type: String,
        required: true,
        default: 'default'
    },
    DobReqADT: {
        type: String,
        required: true,
        default: 'default'
    },
    DobReqCHD: {
        type: String,
        required: true,
        default: 'default'
    },
    DobReqINF: {
        type: String,
        required: true,
        default: 'default'
    },
    OriginAirportCode: {
        type: String,
        required: true,
        default: 'default'
    },
    DestinationAirportCode: {
        type: String,
        required: true,
        default: 'default'
    },
    AirlineCode: {
        type: String,
        required: true,
        default: 'default'
    },
    Duration: {
        type: String,
        required: true,
        default: 'default'
    },
    OriginTerminal: {
        type: String,
        required: true,
        default: 'default'
    },
    DestinationTerminal: {
        type: String,
        required: true,
        default: 'default'
    },
    Craft: {
        type: String,
        required: true,
        default: 'default'
    },
    FareClass: {
        type: String,
        required: true,
        default: 'default'
    },
    FareBasis: {
        type: String,
        required: true,
        default: 'default'
    },
    Baggage: {
        type: String,
        required: true,
        default: 'default'
    },
    CabinBaggage: {
        type: String,
        required: true,
        default: 'default'
    },
    AirlineRemark: {
        type: String,
        required: true,
        default: 'default'
    }
});

const NewPrivateFare = mongoose.model("New Private Fare", newPrivateFare);
module.exports = NewPrivateFare;