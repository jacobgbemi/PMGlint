const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    manager: {
        type: String,
        required: true
    },
    planStart: {
        type: Date,
        required: true
    },
    planEnd: {
        type: Date,
        required: true
    },
    actualStart: {
        type: Date,
        default: function() {
            return this.planStart;
         }
    },
    actualEnd: {
        type: Date,
        default: function() {
           return this.planEnd;
        }
    },
    userId: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
        } 
      ]
}, {
    timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);