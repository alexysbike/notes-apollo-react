const mongoose = require('mongoose');

const {Schema} = mongoose;

const noteSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  labelIds: [{type: Schema.Types.ObjectId}]
});

module.exports = mongoose.model('Note', noteSchema);
