//   "Maintenance": {
//     "description": "Stores maintenance schedules for fields",
//     "schema": {
//       "_id": "ObjectId",
//       "fieldId": "ObjectId (reference to SportField)",
//       "startTime": "Date",
//       "endTime": "Date",
//       "description": "String",
//       "status": "String (enum: ['scheduled', 'in_progress', 'completed'])",
//       "createdAt": "Date",
//       "updatedAt": "Date"
//     }
//   },
const mongoose = require('mongoose');
const { Schema } = mongoose;

const maintenanceSchema = new Schema({
    fieldId: {
        type: Schema.Types.ObjectId,
        ref: 'SportField',
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['scheduled', 'in_progress', 'completed'],
        default: 'scheduled'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Maintenance", maintenanceSchema);