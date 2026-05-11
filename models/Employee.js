
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true,
        default: 0
    }
},
    { timestamps: true });

module.exports = mongoose.models.Employee || mongoose.model("Employee", employeeSchema);