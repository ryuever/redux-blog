var {Schema} = require('mongoose');

var db = require('../components/mongodb');

var CommentSchema = new Schema({
  articleId: {type : Schema.Types.ObjectId, ref: 'Article'},
  creatorId: {type : Schema.Types.ObjectId, ref: 'User'},
  parentId: {type: Schema.Types.ObjectId, ref: 'Comment'},
  avatar: String,
  creatorName: String,
  content: String,
  slug: String,
  full_slug: String
});

CommentSchema.virtual('createDate').get(function(){
  return this._id.getTimestamp();
});

module.exports =db.model('Comment', CommentSchema);
