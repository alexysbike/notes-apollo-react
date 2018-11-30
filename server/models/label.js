const mongoose = require('mongoose');

const {Schema} = mongoose;

const labelSchema = new Schema({
  name: {type: String, required: true}
});

module.exports = mongoose.model('Label', labelSchema);
