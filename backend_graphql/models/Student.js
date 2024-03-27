const  { Schema, model } = require('mongoose')

const StudentSchema = new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
});

module.exports = model('Student', StudentSchema);