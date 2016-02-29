var {Schema} = require('mongoose');

var db = require('../components/mongodb');

var ArticleMetaSchema = new Schema({
  articleId: {type: Schema.Types.ObjectId, ref: 'Article'},
  viewCount: Number,
  upVote: Number,
  downVote: Number
});

ArticleSchema.virtual('createDate').get(function(){
  return this._id.getTimestamp();
});
