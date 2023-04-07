const mongoose = require('mongoose');

const registerSchema = mongoose.Schema(
    {
        team_name: { type: String, required: true },
        leader_name: { type: String, required: true },
        ps_number: { type: Number, required: true },
        link: { type: String, required: true },
        member1: { type: String, required: true },
        member2: { type: String, required: true },
        member3: { type: String, required: true },
        member4: { type: String, required: true },
        member5: { type: String, required: true }
    },
    {
        timestapms: true
    }
);

const Register = mongoose.model('Register', registerSchema);
module.exports = Register;