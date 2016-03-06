var db = require('../components/mongodb');

var UserSchema = require('./user');
var CommentSchema = require('./comment');
var ArticleSchema = require('./article');
var ArticleMetaSchema = require('./article-meta');
var TagSchema = require('./tag');

exports.User = db.model('User', UserSchema);
exports.Comment = db.model('Comment', CommentSchema);
exports.Article = db.model('Article', ArticleSchema);
exports.ArticleMeta = db.model('ArticleMeta', ArticleMetaSchema);
exports.Tag = db.model('Tag', TagSchema);
