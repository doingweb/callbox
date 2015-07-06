var
  mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var EntryCodeSchema = new Schema({
  code: String,
  start: { type: Date, default: Date.now },
  end: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
  createdBy: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('EntryCode', EntryCodeSchema);
