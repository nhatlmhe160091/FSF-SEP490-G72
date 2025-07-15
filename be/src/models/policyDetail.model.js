const mongoose = require('mongoose');
const { Schema } = mongoose;

const policyDetailSchema = new Schema({
    categoryPolicyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CategoryPolicy',
        required: true
    },
    policyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Policy',
        required: true
    }
});

module.exports = mongoose.model("PolicyDetail", policyDetailSchema);