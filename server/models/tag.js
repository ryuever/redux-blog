var {Schema} = require('mongoose');

var db = require("../components/mongodb");
var TagSchema = new Schema({
  articleId: {type: Schema.Types.ObjectId, ref: 'Article'},
  creatorId: {type: Schema.Types.ObjectId, ref: 'User'},
  name: {type: String}
});

TagSchema.virtual('createDate').get(function(){
  return this._id.getTimestamp();
});
