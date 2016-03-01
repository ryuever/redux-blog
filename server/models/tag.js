var {Schema} = require('mongoose');

var db = require("../components/mongodb");
var TagSchema = new Schema({
  creatorId: {type: Schema.Types.ObjectId, ref: 'User'},
  name: {type: String},
  description: {type: String}
});

TagSchema.virtual('createDate').get(function(){
  return this._id.getTimestamp();
});


module.exports = db.model('Tag', TagSchema);
