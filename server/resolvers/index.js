const mongoose = require('mongoose');
const Label = mongoose.model('Label');
const Note = mongoose.model('Note');

const filterParser = filter => {
  if (!filter) return;
  try {
    return JSON.parse(filter);
  } catch (error) {
    throw new Error('Error on filter param');
  }
};

module.exports = {
  Query: {
    labels: (parent, {filter}) => Label.find(filterParser(filter)),
    label: (parent, {id: _id}) => Label.findOne({_id}),
    notes: (parent, {filter}) => Note.find(filterParser(filter)),
    note: (parent, {id: _id}) => Note.findOne({_id})
  },
  Note: {
    labels: ({labelIds}) => Label.find({_id: {$in: labelIds}})
  },
  Mutation: {
    createLabel: (parent, {label}) => Label.create(label),
    updateLabel: (parent, {id: _id, label}) => Label.findOneAndUpdate({_id}, label, {new: true}),
    removeLabel: async (parent, {id: _id}) => {
      await Label.remove({_id});
      return {operation: true};
    },
    createNote: (parent, {note}) => Note.create(note),
    updateNote: (parent, {id: _id, note, overwrite}) => {
      console.log(note);
      return Note.findOneAndUpdate({_id}, note, {new: true, overwrite, runValidators: true});
    },
    removeNote: async (parent, {id: _id}) => {
      await Note.remove({_id});
      return {operation: true};
    }
  }
};
