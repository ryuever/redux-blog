var db = require('../components/mongodb');

var UserSchema = require('../../models/user');
var CommentSchema = require('../../models/comment');
var ArticleSchema = require('../../models/article');
var ArticleMetaSchema = require('../../models/article-meta');
var TagSchema = require('../../models/tag');

exports.User = db.model('User', UserSchema);
exports.Comment = db.model('Comment', CommentSchema);
exports.Article = db.model('Article', ArticleSchema);
exports.ArticleMeta = db.model('ArticleMeta', ArticleMetaSchema);
exports.Tag = db.model('Tag', TagSchema);
