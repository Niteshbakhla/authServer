const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
            username: {
                        type: String,
                        required: true,
            },
            email: {
                        type: String,
                        required: true,
                        unique: true
            },
            password: {
                        type: String,
                        required: true,
                        minlength: 6
            }
});


module.exports = mongoose.model('User', userSchema);


