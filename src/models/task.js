const mongoose = require('mongoose');

const taskScema = new mongoose.Schema({
    description :{
        type: String,
        trim: true,
        required: true
    }, complated: {
        type: Boolean,
        default: false
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

const Task = mongoose.model('Task', taskScema);
module.exports = Task;