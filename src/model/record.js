const mongoose =  require('mongoose')

const RecordSchema = new mongoose.Schema({
    key: { type: String},
    value: { type: String},
    createdAt: { type: Date, required: true},
    counts: { type: Array}
});

const Records = mongoose.model('records', RecordSchema)

module.exports = Records 