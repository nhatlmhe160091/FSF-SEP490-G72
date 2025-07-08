const mongoose = require('mongoose');
const { Schema } = mongoose;

const policySchema = new Schema({
    title: {
        type: String,
        default: "",
        required: true
    },
    content: {
        type: String,
        default: "",
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Policy", policySchema);