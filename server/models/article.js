var {Schema} = require('mongoose');

// var db = require('../components/mongodb');

var ArticleSchema = new Schema({
  creatorId: {type : Schema.Types.ObjectId, ref: 'User'},
  title: String,
  content: String,
  tags: [{type: Schema.Types.ObjectId, ref: "Tag"}]
});

ArticleSchema.virtual('createDate').get(function(){
  return this._id.getTimestamp();
});

// module.exports =db.model('Article', ArticleSchema);
module.exports = ArticleSchema;
