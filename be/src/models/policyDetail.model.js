const mongoose = require('mongoose');
const { Schema } = mongoose;

const policyDetailSchema = new Schema({
    categoryPolicyId: {
        type: Schema.Types.ObjectId,
        ref: 'CategoryPolicy',
        required: true
    },
    title: {
        type: Schema.Types.ObjectId,
        ref: 'Policy',
        required: true
    }
});

module.exports = mongoose.model("PolicyDetail", policyDetailSchema);