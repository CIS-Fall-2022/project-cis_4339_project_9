const uuid = require('uuid');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//collection for intakeData (clients)
let primaryDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    firstName: {
        type: String,
        require: true
    },
    middleName: {
        type: String,
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String
    },
    phoneNumbers: {
        type: Array,
        required: true
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    organization_id: {
        type: mongoose.Schema.Types.ObjectId,
      ref: 'orgData'
    }
}, {
    collection: 'primaryData',
    timestamps: true
});

//collection for eventData
let eventDataSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    orgName: {
        type: String,
        require: true,
    },
    eventName: {
        type: String,
        require: true
    },
    services: {
        type: Array
    },
    date: {
        type: Date,
        required: true
    },
    address: {
        line1: {
            type: String
        },
        line2: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        zip: {
            type: String,
        }
    },
    description: {
        type: String,
    },
    attendees: [{
        type: String
    }],
    organization_id: {
        type: mongoose.Schema.Types.ObjectId,
      ref: 'orgData'
    }
}, {
    collection: 'eventData'
});

//collection for OrganizationData
let orgDataSchema = new Schema({
    _id: { type: String, default: uuid.v1},
    OrgName: {
        type: String,
        require: true
    }
}, {
    collection: 'orgData'   
});


// create models from mongoose schemas
const primarydata = mongoose.model('primaryData', primaryDataSchema);
const eventdata = mongoose.model('eventData', eventDataSchema);
const orgdata = mongoose.model('orgData', orgDataSchema);


// package the models in an object to export 
module.exports = { primarydata, eventdata, orgdata }
