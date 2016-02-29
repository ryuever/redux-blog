var {Schema} = require('mongoose');

var db = require('../components/mongodb');

var ArticleMetaSchema = new Schema({
  articleId: {type: Schema.Types.ObjectId, ref: 'Article'},
  viewCount: {type: Number, default: 0},
  upVote: {type: Number, default: 0},
  downVote: {type: Number, default: 0}
});

ArticleMetaSchema.virtual('createDate').get(function(){
  return this._id.getTimestamp();
});

module.exports = db.model('ArticleMeta', ArticleMetaSchema);
